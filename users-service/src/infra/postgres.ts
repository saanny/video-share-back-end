import {
  PG_DATABASE_HOST,
  PG_DATABASE_NAME,
  PG_DATABASE_PASSWORD,
  PG_DATABASE_PORT,
  PG_DATABASE_USER,
} from "@users/config";
import { Sequelize } from "sequelize";
const sequelize: Sequelize = new Sequelize(
  `postgres://${PG_DATABASE_USER}:${PG_DATABASE_PASSWORD}@${PG_DATABASE_HOST}:${PG_DATABASE_PORT}/${PG_DATABASE_NAME}`,
);

const databaseConnection = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    console.info(
      "Users service successfully connected to postgresql database.",
    );
  } catch (error) {
    console.log(error);
  }
};

export { databaseConnection, sequelize };
