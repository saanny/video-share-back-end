import * as grpc from '@grpc/grpc-js'
import * as protoLoader from '@grpc/proto-loader'
import { ProtoGrpcType } from './dist/auth'
import {RegisterRequest } from './dist/auth/RegisterRequest';
import { LoginRequest } from './dist/auth/LoginRequest';


const host = '0.0.0.0:9090';
const packageDefinition = protoLoader.loadSync('./src/protos/auth.proto')
const proto = grpc.loadPackageDefinition(packageDefinition) as unknown as ProtoGrpcType

const deadline = new Date()
deadline.setSeconds(deadline.getSeconds() + 5)

const client = new proto.auth.AuthService(host, grpc.credentials.createInsecure())

client.waitForReady(deadline, (error?: Error) => {
    if (error) console.log(`Client connect error: ${error.message}`)
})

export async function authRegister(user:RegisterRequest) {
    return new Promise((resolve, reject) => {
        client.register(
            {
                email: user.email,
                password:user.password,
                userName:user.userName
            },
            (error, serverMessage) => {
                if (error) {
                    reject(error)
                } else if (serverMessage) {
                    console.log(serverMessage.user)
                    resolve(serverMessage.user)
                }
            }
        )
    })
}
export async function authLogin(user:LoginRequest) {
    return new Promise((resolve, reject) => {
        client.Login(
            {
                email: user.email,
                password:user.password
            },
            (error, serverMessage) => {
                if (error) {
                    reject(error)
                } else if (serverMessage) {
                    console.log(serverMessage.user)
                    resolve(serverMessage)
                }
            }
        )
    })
}