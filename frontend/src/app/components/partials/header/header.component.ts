import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  cartQuantity = 0;

  /* constructor(cartService: CartService) {
		cartService.getCartObservable().subscribe((newCart) => {
			this.cartQuantity = newCart.totalCount;
		})
	} */
}
