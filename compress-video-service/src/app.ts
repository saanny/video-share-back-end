import { start } from "@compress-video/server";
import { databaseConnection } from "./infra/mongo";

function init() {
    databaseConnection();
    start();
}
init();