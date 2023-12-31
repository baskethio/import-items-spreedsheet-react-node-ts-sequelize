import { Sequelize } from "sequelize-typescript";
import { Items } from "../models/Items";
require("dotenv").config();

const connection = new Sequelize({
	username: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	host: "127.0.0.1",
	dialect: "mysql",
	logging: false,
	models: [Items],
});

export default connection;
