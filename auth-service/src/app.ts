import { start } from '@auth/server';

import { mysqlConnection } from './infra/db/mysql';

function init() {
    mysqlConnection();
    start();
}
init();