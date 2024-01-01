import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cart } from '../../../shared/models/Cart';
import { CartService } from '../../../services/cart.service';
import { CartItem } from '../../../shared/models/CartItem';
import { TitleComponent } from '../../partials/title/title.component';
import { RouterLink } from '@angular/router';
import { NotExpr } from '@angular/compiler';
import { NotFoundComponent } from '../../partials/not-found/not-found.component';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule, TitleComponent, RouterLink, NotFoundComponent],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent {

	cart!: Cart;

	constructor(private cartService: CartService) {

		this.cartService.getCartObservable().subscribe((cart) => {

			this.cart = cart;
		})
	}

	/** 
	 * Метод удаления из корзины
	*/
	removeFromCart(cartItem: CartItem) {
		
		this.cartService.removeFromCart(cartItem.food.id);
	 }
  
	/** 
	 * Метод изменения количества товаров в корзине
	*/
	changeQuantity(cartItem: CartItem, quantityInString: string) {
		
		// количество товара в строке преобразуем в целочисленное значение
		const quantity = parseInt(quantityInString);
		this.cartService.changeQuantity(cartItem.food.id, quantity);
	 }
}
