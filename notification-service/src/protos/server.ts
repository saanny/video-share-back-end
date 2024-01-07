import { TestServiceHandlers } from "./dist/test/TestService"
import * as grpc from '@grpc/grpc-js'
import * as protoLoader from '@grpc/proto-loader'
import { ProtoGrpcType } from "./dist/test"
import { GRPC_HOST } from "@notifications/config"

const host = GRPC_HOST || "localhost:9090"

const grpcServer: TestServiceHandlers = {
    CreateTest(call, callback) {
        if (call.request) {
            console.log(` ${call.request.description} ${call.request.name}`)
        }
        callback(null, {
            tests: {
                description: "test",
                id: 1,
                name: "test"
            },
        })
    }
}
function getServer(): grpc.Server {
    const packageDefinition = protoLoader.loadSync('./src/protos/test.proto')
    const proto = grpc.loadPackageDefinition(packageDefinition) as unknown as ProtoGrpcType
    const server = new grpc.Server()
    server.addService(proto.test.TestService.service, grpcServer)
    return server
}

export function createGrpcServer() {
    const server = getServer()
    server.bindAsync(
        host,
        grpc.ServerCredentials.createInsecure(),
        (err: Error | null, port: number) => {
            if (err) {
                console.error(`Grpc Server error: ${err.message}`)
            } else {
                console.log(`Grpc Server bound on port: ${port}`)
                server.start()
            }
        }
    )
}