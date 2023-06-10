import { RequestHandler } from "express";

import { Items } from "../models/Items";
import { Item } from "../data/types";

export const createItem: RequestHandler = async (req, res, next) => {
	const items = await Items.create({ ...req.body });
	return res.json({ message: "item created", data: items });
};

export const editItem: RequestHandler = async (req, res, next) => {
	const { id } = req.params;
	const items = await Items.update({ ...req.body }, { where: { id } });
	return res.json({ message: "item edited", data: items });
};

export const getAllItems: RequestHandler = async (req, res, next) => {
	const items = await Items.findAll();
	return res.json(items);
};

export const deleteItem: RequestHandler = async (req, res, next) => {
	const { id } = req.params;
	console.log(req.params);
	const items = await Items.findByPk(id);
	await Items.destroy({ where: { id } });
	return res.status(200).json(items);
};

export const bulkInsert: RequestHandler = async (req, res, next) => {
	let bulk = req.body;
	bulk = bulk.map((item: Item) => {
		return {
			ItemNo: item.ItemNo,
			Description:
				item.Description?.length > 1000
					? item.Description.slice(0, 999)
					: item.Description,
			Unit: item.Unit,
			Qty: item.Qty,
			Rate: item.Rate,
			Amount: item.Amount,
		};
	});
	const deleted = await Items.truncate();
	const items = await Items.bulkCreate(req.body);
	return res.json({ message: "item created", data: items });
};
