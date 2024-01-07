import { sequelize } from "@auth/infra/db/mysql";
import { DataTypes } from "sequelize";


const AuthModel = sequelize.define('auth_sessions', {
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: Date.now
    },
}, {
    indexes: []
});

AuthModel.sync({});
export { AuthModel };