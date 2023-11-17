import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Food } from '../../../shared/models/Food';
import { FoodService } from '../../../services/food.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { StarRatingComponent } from '../../partials/star-rating/star-rating.component';
import { SearchComponent } from '../../partials/search/search.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, StarRatingComponent, SearchComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

	foods: Food[] = [];

	constructor(private foodService: FoodService, activatedRoute: ActivatedRoute) {

		activatedRoute.params.subscribe((params) => {

			if (params.searchTerm) {
				
				this.foods = this.foodService.getAllFoodsBySesrchTerm(params.searchTerm);
			} else {

				this.foods = foodService.getAll();
			}
		})
		
	}
}
