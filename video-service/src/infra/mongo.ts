import { MONGO_DB_URL } from "@video/config";
import mongoose from "mongoose";

const databaseConnection = async (): Promise<void> => {
    try {
        await mongoose.connect(MONGO_DB_URL!);
        console.info('Video service successfully connected to database.');
    } catch (error) {
        console.log(error);
    }
};

export { databaseConnection };
