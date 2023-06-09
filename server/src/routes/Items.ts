import express from "express";
const router = express.Router();

import {
	bulkInsert,
	createItem,
	getAllItems,
} from "../controllers/ItemController";

router.get("/", getAllItems);
router.post("/", createItem);
router.post("/bulk", bulkInsert);

module.exports = router;
