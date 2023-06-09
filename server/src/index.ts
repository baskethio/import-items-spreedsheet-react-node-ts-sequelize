import express from "express";
require("dotenv").config();
const app = express();
var cors = require("cors");
const port = process.env.PORT || 5000;
import connection from "./db/config";

const itemRoutes = require("./routes/items");

app.use(cors());

app.use("/items", itemRoutes);

connection
	.sync()
	.then(() => {
		app.listen(port, () => {
			console.log(`App listening on port ${port}`);
		});
	})
	.catch((err) => {
		console.error(err);
	});
