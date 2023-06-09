import { RequestHandler } from "express";

import { Items } from "../models/Items";

export const createItem: RequestHandler = async (req, res, next) => {
	const items = await Items.create({ ...req.body });
	return res.json({ message: "item created", data: items });
};

export const getAllItems: RequestHandler = async (req, res, next) => {
	const items = await Items.findAll();
	return res.json(items);
};

export const deleteItem: RequestHandler = async (req, res, next) => {
	const { id } = req.params;
	const items = await Items.findByPk(id);
	await Items.destroy({ where: { id } });
	return res.status(200).json(items);
};
