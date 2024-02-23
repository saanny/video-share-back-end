import { start } from '@notifications/server';

import { databaseConnection } from './infra/mongo';

function init() {
    databaseConnection();
    start();
}
init();