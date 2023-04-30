import path from 'path'
import express from 'express';
import * as grpc from '@grpc/grpc-js'
import * as protoLoader from '@grpc/proto-loader'
import { ProtoGrpcType } from './proto/authentication'
import mongoose from 'mongoose';
import Data from './models/Data';

const JWT_PORT = 8080;
const PORT = 8081;
const PROTO_FILE = './proto/authentication.proto';

// gRPC 

const packageDef = protoLoader.loadSync(path.resolve(__dirname, PROTO_FILE));
const grpcObj = (grpc.loadPackageDefinition(packageDef) as unknown) as ProtoGrpcType;
const authPackage = grpcObj.authPackage;

// DB

const mongoDB = 'mongodb://127.0.0.1:27017/anotherdb';
mongoose.connect(mongoDB);
mongoose.Promise = Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error'));

// Express

const app = express();

// Express API

app.get('/database', async (req: any, res: any) => {
    try {
        if (req.headers['authorization']) {
            const timeout = new Date();
            timeout.setSeconds(timeout.getSeconds() + 5);
            client.waitForReady(timeout, (err) => {
                if (err) {
                    console.log(err);
                    return
                }
                client.Verify({ token: req.headers['authorization'].split(' ')[1] }, (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                    console.log(result?.token === 'Success');
                    if (result?.token === 'Success') {
                        Data.find().then((result) => {
                            console.log(result);
                            res.json({ data: result })
                        })
                    } else {
                        res.json({ message: 'Invalid API key' })
                    }
                });
            });
        } else {
            res.json({ message: 'Invalid API key' })
        }
    } catch (err) {
        console.log(err);
    }
    
});

// gRPC client

const client = new grpcObj.authPackage.Auth(
    `0.0.0.0:${JWT_PORT}`, grpc.credentials.createInsecure()
);

// Express app

app.listen(PORT, () => { console.log(`Server started on ${PORT}`) })