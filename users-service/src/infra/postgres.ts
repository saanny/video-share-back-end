import { PG_DATABASE_HOST, PG_DATABASE_NAME, PG_DATABASE_PASSWORD, PG_DATABASE_PORT, PG_DATABASE_USER } from '@users/config';
import { Pool } from 'pg';
const pool: Pool = new Pool({
    host: PG_DATABASE_HOST,
    user: PG_DATABASE_USER,
    password: PG_DATABASE_PASSWORD,
    port: Number(PG_DATABASE_PORT),
    database: PG_DATABASE_NAME,
    ssl: false
});

pool.on('error', (error: Error) => {
    console.log('error', 'pg client error', error);
    process.exit(-1);
});

const databaseConnection = async (): Promise<void> => {
    try {
        await pool.connect();
        console.info('Users service successfully connected to postgresql database.');
    } catch (error) {
        console.log(error);
    }
};

export { databaseConnection, pool };
