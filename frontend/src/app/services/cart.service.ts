import { Injectable } from '@angular/core';
import { Cart } from '../shared/models/Cart';
import { BehaviorSubject, Observable } from 'rxjs';
import { Food } from '../shared/models/Food';
import { CartItem } from '../shared/models/CartItem';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
	
export class CartService {

	// определим поле(свойство) в котором будет храниться корзина и сохраним в нём экземпляр корзины
	private cart: Cart = this.getCartFromLocalStorage();

	// свойство: предмет корзины, который имеет тип субъекта поведения и по умолчанию равно новому субъекту поведения для этой корзины
	private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject(this.cart);

  constructor(private localStorage: StorageService) { }

	/**
	 * Добавление товара в корзину	
	 */
	addToCart(food: Food): void {
	  
	  let cartItem = this.cart.items.find((item) => item.food.id === food.id);
	  
	if (cartItem)
	  return;

	// если такого товара в корзине нет, то добавим его
	this.cart.items.push(new CartItem(food));
		
	this.setCartToLocalStorage();
	}
	
	/**
	 * Удаление товара из корзины	 
	 */
	removeFromCart(foodId: string): void {

		this.cart.items = this.cart.items.filter((item) => item.food.id != foodId);

		this.setCartToLocalStorage();
	}
	
	/**
	 * Изменение количества товаров в корзине
	 */
	changeQuantity(foodId: string, quantity: number) {
		 
		// найдём элемент в корзине с идентификатором переданным в параметры
		let cartItem = this.cart.items.find((item) => item.food.id === foodId);

		if (!cartItem) return;
  
		// установим количество товара в корзине равное переданному в параметры
		cartItem.quantity = quantity;

		// получим цену товара 
		cartItem.price = quantity * cartItem.food.price;

		this.setCartToLocalStorage();
	 }

	/**
	 * Очистка корзины
	 */
	clearCart() {
		 
		this.cart = new Cart();

		this.setCartToLocalStorage();
	}
	
	/** 
	 * Получим корзину за которой наблюдаем для текущего объекта
	*/
	getCartObservable(): Observable<Cart> {

		return this.cartSubject.asObservable();
	 }

	/**
	 * Метод устанавливает(помещает) объект корзины в локальное хранилище, чтобы он не удалялся при перезагрузке страницы
	 */
	private setCartToLocalStorage(): void {

		// получим значение общей суммы стоимости товаров в корзине
		// (метод: reduce() будет вызываться столько раз сколько элементов в корзине, начальное значение- ноль)
		this.cart.totalPrice = this.cart.items.reduce((prevSum, currentItem) => prevSum + currentItem.price, 0);

		// аналогично получим значение общего количества товаров в корзине
		this.cart.totalCount = this.cart.items.reduce((prevSum, currentItem) => prevSum + currentItem.quantity, 0);
  
		// перобразуем объект корзины в json-строку и сохраним в переменной
		const cartJson = JSON.stringify(this.cart);
		// установим ключ локального хранилища и передадим json-строку с нашей корзиной
		this.localStorage.setItem('Cart', cartJson);

		// говорим всем слушателям корзины, установленной в локальное хранилище, что в ней произошли изменения
		this.cartSubject.next(this.cart);
	}
	
  /** 
	* Метод получает корзину из локального хранилища по ключу, созданного при установке её в локальное хранилище
  */
	private getCartFromLocalStorage(): Cart {
		 
		const cartJson = this.localStorage.getItem('Cart');
		
		return cartJson ? JSON.parse(cartJson) : new Cart();
	 }
}
