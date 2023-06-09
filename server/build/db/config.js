"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const Items_1 = require("../models/Items");
require("dotenv").config();
const connection = new sequelize_typescript_1.Sequelize({
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: "127.0.0.1",
    dialect: "mysql",
    logging: false,
    models: [Items_1.Items],
});
exports.default = connection;
