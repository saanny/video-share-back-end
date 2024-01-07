import { start } from "@upload/server";
import { databaseConnection } from "./infra/mongo";

function init() {
    databaseConnection();
    start();
}
init();