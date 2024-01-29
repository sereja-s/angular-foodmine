import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../services/cart.service';
import { User } from '../../../shared/models/User';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {

	cartQuantity = 0;
	
	user!:User;	

	constructor(cartService: CartService, private userService: UserService) {
	  
		cartService.getCartObservable().subscribe((newCart) => {
			this.cartQuantity = newCart.totalCount;
		})

		userService.userObservable.subscribe((newUser) => {
			this.user = newUser;
		 })
	}

	logout(){
		this.userService.logout();
	 }
  
	/**
	 * Метод-геттер проверяет авторизован ли пользователь
	 */
	 get isAuth(){
		return this.user.token;
	 }
}
