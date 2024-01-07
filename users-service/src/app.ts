import { start } from "@users/server";
import { databaseConnection } from "./infra/postgres";

function init() {
    databaseConnection();
    start();
}
init();