// This client is for testing purposes only

import path from 'path';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { ProtoGrpcType } from './proto/authentication';


const PORT = 8080;
const PROTO_FILE = './proto/authentication.proto';

const timeout = new Date();

const packageDef = protoLoader.loadSync(path.resolve(__dirname, PROTO_FILE));
const grpcObj = (grpc.loadPackageDefinition(packageDef) as unknown) as ProtoGrpcType;

const client = new grpcObj.authPackage.Auth(
    `0.0.0.0:${PORT}`, grpc.credentials.createInsecure()
);

timeout.setSeconds(timeout.getSeconds() + 5);
client.waitForReady(timeout, (err) => {
    if (err) {
        console.log(err);
        return
    }
    onReady();
});

// timeout.setSeconds(timeout.getSeconds() + 5);
// client.waitForReady(timeout, (err) => {
//     if (err) {
//         console.log(err);
//         return
//     }
//     client.waitForReady(timeout, (err) => {
//         if (err) {
//             console.log(err);
//             return null
//         }
//         client.Verify({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDRkYWZmYTEyOTM1MGFkYTJlMzIwZjkiLCJ1c2VybmFtZSI6InRlc3QiLCJpYXQiOjE2ODI4NDkzNzl9.HyD_jyPUrH8oHM33BTjtuytMvLP4tTAjZTmcDb7WlNE" }, (err, result) => {
//             if (err) {
//                 console.log(err);
//                 return null
//             }
//             console.log(result);
//         });
//     });
// });

function onReady() {
    // Creating a new user
    // client.Register({username: "test2", password:"password123"}, (err, result) => {
    //     if (err) {
    //         console.log(err)
    //         return
    //     }
    //     console.log(result);
    // });

    // Signing In
    //     client.SignIn({username: "test", password:"password"}, (err, result) => {
    //     if (err) {
    //         console.log(err)
    //         return
    //     }
    //     console.log(result);
    //     const token = result;
    // });

    // Authenticate token
        client.Verify({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDRkYWZmYTEyOTM1MGFkYTJlMzIwZjkiLCJ1c2VybmFtZSI6InRlc3QiLCJpYXQiOjE2ODI4NDkzNzl9.HyD_jyPUrH8oHM33BTjtuytMvLP4tTAjZTmcDb7WlNE" }, (err, result) => {
        if (err) {
            console.log(err)
            return
        }
        console.log(result);
    });
}