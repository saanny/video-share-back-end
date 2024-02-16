import * as grpc from '@grpc/grpc-js'
import * as protoLoader from '@grpc/proto-loader'
import { ProtoGrpcType } from './dist/test'


const host = '0.0.0.0:9090';
const packageDefinition = protoLoader.loadSync('./src/protos/test.proto')
const proto = grpc.loadPackageDefinition(packageDefinition) as unknown as ProtoGrpcType

const deadline = new Date()
deadline.setSeconds(deadline.getSeconds() + 5)

const client = new proto.test.TestService(host, grpc.credentials.createInsecure())

client.waitForReady(deadline, (error?: Error) => {
    if (error) console.log(`Client connect error: ${error.message}`)
})

export async function doUnaryCallAsync() {
    return new Promise((resolve, reject) => {
        client.createTest(
            {
                name: 'Amir',
                description: "Hello"
            },
            (error, serverMessage) => {
                if (error) {
                    reject(error)
                } else if (serverMessage) {
                    console.log(serverMessage.tests)
                    resolve(serverMessage.tests)
                }
            }
        )
    })
}