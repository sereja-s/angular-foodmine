import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Food } from '../../../shared/models/Food';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FoodService } from '../../../services/food.service';
import { StarRatingComponent } from '../../partials/star-rating/star-rating.component';

@Component({
  selector: 'app-food-page',
  standalone: true,
  imports: [CommonModule, StarRatingComponent, RouterLink],
  templateUrl: './food-page.component.html',
  styleUrl: './food-page.component.css'
})
export class FoodPageComponent {

	food!: Food;
	
	// опишем конструктор (в параметрах передаём: 1- активированный маршрут, чтобы прочитать id, 2- Food-сервис)
	constructor(activatedRoute: ActivatedRoute, foodService: FoodService) {
		activatedRoute.params.subscribe((params) => {
		  if(params.id)
		  this.food = foodService.getFoodById(params.id);
		})
	  }
}
