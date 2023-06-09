"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllItems = exports.createItem = void 0;
const item_1 = __importDefault(require("../../models/item"));
const createItem = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const item = yield item_1.default.create(Object.assign({}, req.body));
    return res.json({ message: "item created" });
});
exports.createItem = createItem;
const getAllItems = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const items = yield item_1.default.findAll();
    return res.json(items);
});
exports.getAllItems = getAllItems;
