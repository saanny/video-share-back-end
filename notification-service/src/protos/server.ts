import { ProtoGrpcType } from "./dist/notification"
import * as grpc from '@grpc/grpc-js'
import * as protoLoader from '@grpc/proto-loader'
import { GRPC_HOST } from "@notifications/config"
import { NotificationServiceHandlers } from "./dist/test/NotificationService"

const host = GRPC_HOST || "localhost:9292"

const grpcServer: NotificationServiceHandlers = {
    GetNotifications(call, callback) {
        if (call.request) {
            console.log(` ${call.request.userId}`)
        }
        callback(null, {
            notifications: {
                description:"test",
                id:1,
                isRead:true,
                title:"test"
            },
        })
    }
}
function getServer(): grpc.Server {
    const packageDefinition = protoLoader.loadSync('./src/protos/notification.proto')
    const proto = grpc.loadPackageDefinition(packageDefinition) as unknown as ProtoGrpcType
    const server = new grpc.Server()
    server.addService(proto.notification.NotificationService.service, grpcServer)
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