import express from "express";
const router = express.Router();

import {
	bulkInsert,
	createItem,
	editItem,
	getAllItems,
} from "../controllers/ItemController";

router.get("/", getAllItems);
router.post("/", createItem);
router.patch("/:id", editItem);
router.post("/bulk", bulkInsert);

module.exports = router;
