const PRODUCTION = ['prod', 'production'].includes(
    process.env.NODE_ENV as string,
);
const DEVELOPMENT = !PRODUCTION;
if (DEVELOPMENT) {
    require('dotenv').config();
}

const {
    RABBITMQ_ENDPOINT,
    MYSQL_DATABASE,
    MYSQL_USER,
    MYSQL_PASSWORD,
    MYSQL_HOST
} = process.env;

export {
    RABBITMQ_ENDPOINT,
    MYSQL_DATABASE,
    MYSQL_USER,
    MYSQL_PASSWORD,
    MYSQL_HOST
};
