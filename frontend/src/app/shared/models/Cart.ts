import { CartItem } from "./CartItem";
/**
 * модель корзины
 */
export class Cart{
	items:CartItem[] = [];
	totalPrice:number = 0;
	totalCount:number = 0;
 }