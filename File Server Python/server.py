import grpc
import authentication_pb2_grpc as pb2_grpc
import authentication_pb2 as pb2

JWT_PORT = 8080

def main():
    # with grpc.insecure_channel(f"0.0.0.0:{JWT_PORT}") as channel:
    #     stub = pb2_grpc.AuthStub(channel)
    #     response = stub.Verify(pb2.VerifyRequest(token='test'))
    with grpc.secure_channel("0.0.0.0:8080", grpc.ssl_channel_credentials()) as channel:
        stub = pb2_grpc.AuthStub(channel)
        response = stub.Verify(pb2.VerifyRequest(token='test'))
    print("Received: " + response.token)

    return

main()