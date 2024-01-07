const PRODUCTION = ['prod', 'production'].includes(
    process.env.NODE_ENV as string,
);
const DEVELOPMENT = !PRODUCTION;
if (DEVELOPMENT) {
    require('dotenv').config();
}

const {
    RABBITMQ_ENDPOINT,
    PG_DATABASE_HOST,
    PG_DATABASE_USER,
    PG_DATABASE_PASSWORD,
    PG_DATABASE_PORT,
    PG_DATABASE_NAME,
    NODE_ENV
} = process.env;

export {
    RABBITMQ_ENDPOINT,
    PG_DATABASE_HOST,
    PG_DATABASE_USER,
    PG_DATABASE_PASSWORD,
    PG_DATABASE_PORT,
    PG_DATABASE_NAME,
    NODE_ENV
};
