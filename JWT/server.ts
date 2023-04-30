import path from 'path'
import * as grpc from '@grpc/grpc-js'
import * as protoLoader from '@grpc/proto-loader'
import { ProtoGrpcType } from './proto/authentication'
import { AuthHandlers } from './proto/authPackage/Auth'
import mongoose from 'mongoose';
import User from './models/User';
import { verifyJwt, signJwt } from './auth/validate-token';

const PORT = 8080;
const PROTO_FILE = './proto/authentication.proto';

// gRPC

const packageDef = protoLoader.loadSync(path.resolve(__dirname, PROTO_FILE));
const grpcObj = (grpc.loadPackageDefinition(packageDef) as unknown) as ProtoGrpcType;
const authPackage = grpcObj.authPackage;

// DB

const mongoDB = 'mongodb://127.0.0.1:27017/usersdb';
mongoose.connect(mongoDB);
mongoose.Promise = Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error'));

// gRPC server

function main() {
    const server = getServer()

    server.bindAsync(`0.0.0.0:${PORT}`, grpc.ServerCredentials.createInsecure(), (err, port) => {
        if (err) {
            console.log(err);
            return
        }
        console.log(`Server started on ${port}`);
        server.start();
    });
}

function getServer() {
    const server = new grpc.Server();
    server.addService(authPackage.Auth.service, {
        "Register": async (req, res) => {
            console.log(req, res);

            try {
                const user = await User.create({ username: req.request.username, password: req.request.password });
                res(null, { token: 'Registeration succesfull' });
              } catch (err: any) {
                if (err.code === 'P2002') {
                    res({
                      code: grpc.status.ALREADY_EXISTS,
                      message: 'Email already exists',
                    });
                  }
                  res({ code: grpc.status.INTERNAL, message: err.message });
                console.log(err);
              }
        },
        "SignIn": async (req, res) => {
            try {
                const user = await User.findOne({ username: req.request.username });
                if (!user || !(await user.isValidPassword(req.request.password!))) {
                    res({
                        code: grpc.status.INVALID_ARGUMENT,
                        message: 'Invalid username or password',
                      });
                }

                if (user) {
                    console.log(user);
                    const body = { _id: user._id, username: user.username }
                    const token = await signJwt(body, 'verySecretKey');
                    res(null, { token: token });
                }
                
            } catch (err: any) {
                res({
                    code: grpc.status.INTERNAL,
                    message: err.message,
                  });
            }
        },
        "Verify": async (req, res) => {
            try {
                const token = verifyJwt(req.request.token!);
                console.log(token);
                if (token === null) {
                    res({
                        code: grpc.status.INVALID_ARGUMENT,
                        message: 'Invalid token',
                      });
                }
                res(null, { token: 'Success' });
            } catch (err: any) {
                res({
                    code: grpc.status.INTERNAL,
                    message: err.message,
                  });
            }
        }
    } as AuthHandlers)
    return server;
}

main();