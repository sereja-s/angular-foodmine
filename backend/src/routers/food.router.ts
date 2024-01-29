import { Router } from "express";
import { sample_foods, sample_tags } from "../data";
import asyncHandler from "express-async-handler";
import { FoodModel } from "../models/food.model";

const router = Router();

router.get("/seed", asyncHandler(
	async (req, res) => {
		// проверим не установлен ли этот продукт ранее, т.е. кол-во этого продукта не может быть более одного(нового) уникального
		const foodCount = await FoodModel.countDocuments();
		if (foodCount > 0) {
			res.send("Такое (для товаров) уже есть в БД !!!");
			return;
		}

		//res.send(sample_foods);
		// создадим все образцы продуктов в БД
		await FoodModel.create(sample_foods);

		res.send("Seed товаров готов !");
  }
 ))
/*  router.get("/", (req, res) => {
    res.send(sample_foods);
}) */

router.get("/", asyncHandler(
	async (req, res) => {
	  const foods = await FoodModel.find();
		 res.send(foods);
	}
 ))

/* router.get("/search/:searchTerm", (req, res) => {
  const searchTerm  = req.params.searchTerm;
  const foods = sample_foods
  .filter(food => food.name.toLowerCase()
  .includes(searchTerm.toLowerCase()));
  res.send(foods);
}) */

router.get("/search/:searchTerm", asyncHandler(
	async (req, res) => {
		// сохраним в константе регулярное выражение, передав вторым параметром: регистронезависимый (здесь-поиск)
	  const searchRegex = new RegExp(req.params.searchTerm, 'i');
	  const foods = await FoodModel.find({name: {$regex:searchRegex}})
	  res.send(foods);
	}
 ))

/* router.get("/tags", (req, res) => {
  res.send(sample_tags);
}) */

router.get("/tags", asyncHandler(
	async (req, res) => {
	  const tags = await FoodModel.aggregate([
		 {
			$unwind:'$tags'
		 },
		 {
			$group:{
			  _id: '$tags',
			  count: {$sum: 1}
			}
		 },
		 {
			$project:{
			  _id: 0,
			  name:'$_id',
			  count: '$count'
			}
		 }
	  ]).sort({count: -1});
 
	  const all = {
		 name : 'All',
		 count: await FoodModel.countDocuments()
	  }
 
	  tags.unshift(all);
	  res.send(tags);
	}
 ))

/* router.get("/tag/:tagName", (req, res) => {
  const tagName = req.params.tagName;
  const foods = sample_foods
  .filter(food => food.tags?.includes(tagName));
  res.send(foods);
}) */

router.get("/tag/:tagName",asyncHandler(
	async (req, res) => {
	  const foods = await FoodModel.find({tags: req.params.tagName})
	  res.send(foods);
	}
 ))

/* router.get("/:foodId", (req, res) => {
  const foodId = req.params.foodId;
  const food = sample_foods.find(food => food.id == foodId);
  res.send(food);
}) */

router.get("/:foodId", asyncHandler(
	async (req, res) => {
	  const food = await FoodModel.findById(req.params.foodId);
	  res.send(food);
	}
 ))

// экспортируем маршрутизатор по умолчанию
export default router;