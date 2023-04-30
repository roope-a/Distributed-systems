import * as path from 'path';
import * as express from 'express';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { ProtoGrpcType } from './proto/authentication';

const serveIndex = require('serve-index');

const JWT_PORT = 8080;
const PORT = 8082;
const PROTO_FILE = './proto/authentication.proto';

// gRPC 

const packageDef = protoLoader.loadSync(path.resolve(__dirname, PROTO_FILE));
const grpcObj = (grpc.loadPackageDefinition(packageDef) as unknown) as ProtoGrpcType;
const authPackage = grpcObj.authPackage;

// Express

const app = express();


const authenticate = function (req, res, next) {
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
                    if (result?.token === 'Success') {
                        req.user = { user: 'valid' }
                        next();
                    }
                });
            });
        } else {
            
            // currently does not return anything to the request to indicate failure

            req.user = null;
            // next();
            return
        }
    } catch (err) {
        console.log(err);
    }
};

app.use(express.static('public'), authenticate, serveIndex('public'));

// gRPC client

const client = new grpcObj.authPackage.Auth(
    `0.0.0.0:${JWT_PORT}`, grpc.credentials.createInsecure()
);

// Express app

app.listen(PORT, () => { console.log(`Server started on ${PORT}`) })