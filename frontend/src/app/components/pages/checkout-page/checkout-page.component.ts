import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Order } from '../../../shared/models/Order';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartService } from '../../../services/cart.service';
import { UserService } from '../../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { TitleComponent } from '../../partials/title/title.component';
import { TextInputComponent } from '../../partials/text-input/text-input.component';
import { OrderItemsListComponent } from '../../partials/order-items-list/order-items-list.component';
import { MapComponent } from '../../partials/map/map.component';
import { OrderService } from '../../../services/order.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-checkout-page',
  standalone: true,
  imports: [CommonModule, TitleComponent, ReactiveFormsModule, TextInputComponent, OrderItemsListComponent, MapComponent],
  templateUrl: './checkout-page.component.html',
  styleUrl: './checkout-page.component.css'
})
export class CheckoutPageComponent implements OnInit {

	order: Order = new Order();

	checkoutForm!: FormGroup;

	constructor(cartService: CartService,
		private formBuilder: FormBuilder,
		private userService: UserService,
		private toastrService: ToastrService,
		private orderService: OrderService,
		private router: Router) {

			const cart = cartService.getCart();
			this.order.items = cart.items;
			this.order.totalPrice = cart.totalPrice;
		}

		ngOnInit(): void {
			let {name, address} = this.userService.currentUser;
			this.checkoutForm = this.formBuilder.group({
			  name: [name, Validators.required],
			  address: [address, Validators.required]
			});
		}
	
		get fc(){
			return this.checkoutForm.controls;
		 }

		 createOrder(){
			if(this.checkoutForm.invalid){
			  this.toastrService.warning('Заполните входные данные пожалуйста', 'Не правилный ввод данных');
			  return;
			}

			 // Part 17.3 - Creaing Order
			if(!this.order.addressLatLng){
				this.toastrService.warning('Пожалуйста выберите своё местоположение на карте', 'Местоположение');
				return;
			 }
	  
			this.order.name = this.fc.name.value;
			this.order.address = this.fc.address.value;
	  
			 //console.log(this.order); // Part 17.3 - Creaing Order
			 this.orderService.create(this.order).subscribe({
				next:() => {
				  this.router.navigateByUrl('/payment');
				},
				error:(errorResponse) => {
				  this.toastrService.error(errorResponse.error, 'Cart');
				}
			 })
		 }

}
