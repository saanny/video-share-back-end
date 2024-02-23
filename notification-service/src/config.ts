const PRODUCTION = ['prod', 'production'].includes(
    process.env.NODE_ENV as string,
);
const DEVELOPMENT = !PRODUCTION;
if (DEVELOPMENT) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require('dotenv').config();
}

const {
    RABBITMQ_ENDPOINT,
    MONGO_DB_URL,
    GRPC_HOST
} = process.env;

export {
    RABBITMQ_ENDPOINT,
    MONGO_DB_URL,
    GRPC_HOST
};
