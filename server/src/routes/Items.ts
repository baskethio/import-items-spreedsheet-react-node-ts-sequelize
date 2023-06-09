import express from "express";
const router = express.Router();

import { createItem, getAllItems } from "../controllers/ItemController";

router.get("/", getAllItems);
router.post("/", createItem);

module.exports = router;
