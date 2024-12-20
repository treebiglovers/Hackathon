import { defineConfig } from "@mikro-orm/mysql";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
    dbName: "LendMe",
    entities: [ "dist/backend/src/entities/**/*.js" ],
    entitiesTs: [ "src/entities/**/*.ts" ],
    clientUrl: process.env.DB_CLIENT_URL,
    debug: true,
    user: process.env.DB_CLIENT_USERNAME,
    password: process.env.DB_CLIENT_PASSWORD,
    
});