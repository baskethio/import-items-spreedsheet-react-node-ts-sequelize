import express from "express";
const router = express.Router();

import {
	bulkInsert,
	createItem,
	deleteItem,
	editItem,
	getAllItems,
} from "../controllers/ItemController";

router.get("/", getAllItems);
router.post("/", createItem);
router.patch("/:id", editItem);
router.delete("/:id", deleteItem);
router.post("/bulk", bulkInsert);

module.exports = router;
