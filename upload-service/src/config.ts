const PRODUCTION = ['prod', 'production'].includes(
    process.env.NODE_ENV as string,
);
const DEVELOPMENT = !PRODUCTION;
if (DEVELOPMENT) {
    require('dotenv').config();
}

const {
    RABBITMQ_ENDPOINT,
} = process.env;

export {
    RABBITMQ_ENDPOINT,
};
