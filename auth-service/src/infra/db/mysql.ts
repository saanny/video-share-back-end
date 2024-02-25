import {
  MYSQL_DATABASE,
  MYSQL_HOST,
  MYSQL_PASSWORD,
  MYSQL_USER,
} from '@auth/config';
import { Sequelize } from 'sequelize';
export const sequelize: Sequelize = new Sequelize(
  MYSQL_DATABASE!,
  MYSQL_USER!,
  MYSQL_PASSWORD!,
  {
    host: MYSQL_HOST,
    dialect: 'mysql',
  },
);

export async function mysqlConnection(): Promise<void> {
  try {
    await sequelize.authenticate();
    console.info(
      'AuthService Mysql database connection has been established successfully.',
    );
  } catch (error) {
    console.log(error);
  }
}
