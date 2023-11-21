import { Food } from "./Food";

/**
 * модель элемента корзины
 */
export class CartItem{
	constructor(public food: Food){ }
	quantity:number = 1 ;
	price: number = this.food.price;
 }