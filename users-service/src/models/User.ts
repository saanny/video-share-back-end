import { sequelize } from "@users/infra/postgres";
import { DataTypes } from "sequelize";

const UserModel = sequelize.define(
  "users",
  {
    userName: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: Date.now,
    },
  },
  {
    indexes: [],
  },
);
UserModel.sync({});
export { UserModel };
