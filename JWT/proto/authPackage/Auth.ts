// Original file: proto/authentication.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { RegisterRequest as _authPackage_RegisterRequest, RegisterRequest__Output as _authPackage_RegisterRequest__Output } from '../authPackage/RegisterRequest';
import type { RegisterResponse as _authPackage_RegisterResponse, RegisterResponse__Output as _authPackage_RegisterResponse__Output } from '../authPackage/RegisterResponse';
import type { SignInRequest as _authPackage_SignInRequest, SignInRequest__Output as _authPackage_SignInRequest__Output } from '../authPackage/SignInRequest';
import type { SignInResponse as _authPackage_SignInResponse, SignInResponse__Output as _authPackage_SignInResponse__Output } from '../authPackage/SignInResponse';
import type { VerifyRequest as _authPackage_VerifyRequest, VerifyRequest__Output as _authPackage_VerifyRequest__Output } from '../authPackage/VerifyRequest';
import type { VerifyResponse as _authPackage_VerifyResponse, VerifyResponse__Output as _authPackage_VerifyResponse__Output } from '../authPackage/VerifyResponse';

export interface AuthClient extends grpc.Client {
  Register(argument: _authPackage_RegisterRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_authPackage_RegisterResponse__Output>): grpc.ClientUnaryCall;
  Register(argument: _authPackage_RegisterRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_authPackage_RegisterResponse__Output>): grpc.ClientUnaryCall;
  Register(argument: _authPackage_RegisterRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_authPackage_RegisterResponse__Output>): grpc.ClientUnaryCall;
  Register(argument: _authPackage_RegisterRequest, callback: grpc.requestCallback<_authPackage_RegisterResponse__Output>): grpc.ClientUnaryCall;
  register(argument: _authPackage_RegisterRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_authPackage_RegisterResponse__Output>): grpc.ClientUnaryCall;
  register(argument: _authPackage_RegisterRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_authPackage_RegisterResponse__Output>): grpc.ClientUnaryCall;
  register(argument: _authPackage_RegisterRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_authPackage_RegisterResponse__Output>): grpc.ClientUnaryCall;
  register(argument: _authPackage_RegisterRequest, callback: grpc.requestCallback<_authPackage_RegisterResponse__Output>): grpc.ClientUnaryCall;
  
  SignIn(argument: _authPackage_SignInRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_authPackage_SignInResponse__Output>): grpc.ClientUnaryCall;
  SignIn(argument: _authPackage_SignInRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_authPackage_SignInResponse__Output>): grpc.ClientUnaryCall;
  SignIn(argument: _authPackage_SignInRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_authPackage_SignInResponse__Output>): grpc.ClientUnaryCall;
  SignIn(argument: _authPackage_SignInRequest, callback: grpc.requestCallback<_authPackage_SignInResponse__Output>): grpc.ClientUnaryCall;
  signIn(argument: _authPackage_SignInRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_authPackage_SignInResponse__Output>): grpc.ClientUnaryCall;
  signIn(argument: _authPackage_SignInRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_authPackage_SignInResponse__Output>): grpc.ClientUnaryCall;
  signIn(argument: _authPackage_SignInRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_authPackage_SignInResponse__Output>): grpc.ClientUnaryCall;
  signIn(argument: _authPackage_SignInRequest, callback: grpc.requestCallback<_authPackage_SignInResponse__Output>): grpc.ClientUnaryCall;
  
  Verify(argument: _authPackage_VerifyRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_authPackage_VerifyResponse__Output>): grpc.ClientUnaryCall;
  Verify(argument: _authPackage_VerifyRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_authPackage_VerifyResponse__Output>): grpc.ClientUnaryCall;
  Verify(argument: _authPackage_VerifyRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_authPackage_VerifyResponse__Output>): grpc.ClientUnaryCall;
  Verify(argument: _authPackage_VerifyRequest, callback: grpc.requestCallback<_authPackage_VerifyResponse__Output>): grpc.ClientUnaryCall;
  verify(argument: _authPackage_VerifyRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_authPackage_VerifyResponse__Output>): grpc.ClientUnaryCall;
  verify(argument: _authPackage_VerifyRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_authPackage_VerifyResponse__Output>): grpc.ClientUnaryCall;
  verify(argument: _authPackage_VerifyRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_authPackage_VerifyResponse__Output>): grpc.ClientUnaryCall;
  verify(argument: _authPackage_VerifyRequest, callback: grpc.requestCallback<_authPackage_VerifyResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface AuthHandlers extends grpc.UntypedServiceImplementation {
  Register: grpc.handleUnaryCall<_authPackage_RegisterRequest__Output, _authPackage_RegisterResponse>;
  
  SignIn: grpc.handleUnaryCall<_authPackage_SignInRequest__Output, _authPackage_SignInResponse>;
  
  Verify: grpc.handleUnaryCall<_authPackage_VerifyRequest__Output, _authPackage_VerifyResponse>;
  
}

export interface AuthDefinition extends grpc.ServiceDefinition {
  Register: MethodDefinition<_authPackage_RegisterRequest, _authPackage_RegisterResponse, _authPackage_RegisterRequest__Output, _authPackage_RegisterResponse__Output>
  SignIn: MethodDefinition<_authPackage_SignInRequest, _authPackage_SignInResponse, _authPackage_SignInRequest__Output, _authPackage_SignInResponse__Output>
  Verify: MethodDefinition<_authPackage_VerifyRequest, _authPackage_VerifyResponse, _authPackage_VerifyRequest__Output, _authPackage_VerifyResponse__Output>
}
