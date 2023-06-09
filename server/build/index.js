"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv").config();
const app = (0, express_1.default)();
var cors = require("cors");
const port = process.env.PORT || 5000;
const config_1 = __importDefault(require("./db/config"));
const itemRoutes = require("./routes/items");
app.use(cors());
app.use("/items", itemRoutes);
config_1.default
    .sync()
    .then(() => {
    app.listen(port, () => {
        console.log(`App listening on port ${port}`);
    });
})
    .catch((err) => {
    console.error(err);
});
