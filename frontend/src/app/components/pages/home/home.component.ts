import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Food } from '../../../shared/models/Food';
import { FoodService } from '../../../services/food.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { StarRatingComponent } from '../../partials/star-rating/star-rating.component';
import { SearchComponent } from '../../partials/search/search.component';
import { TagsComponent } from '../../partials/tags/tags.component';
import { NotFoundComponent } from '../../partials/not-found/not-found.component';
import { Observable } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, StarRatingComponent, SearchComponent, TagsComponent, NotFoundComponent, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

	foods: Food[] = [];

	constructor(private foodService: FoodService, activatedRoute: ActivatedRoute) {

		let foodsObservalbe:Observable<Food[]>;

		activatedRoute.params.subscribe((params) => {			
			// чтобы не показывало ошибки в синтксисе, нужно в tsconfig.json установить параметр в значение: "noPropertyAccessFromIndexSignature": false Теперь в условии не обязательно писать: params['searchTerm']
			if (params.searchTerm)
				// еси пришёл параметр запроса поиска, то фильтруем продукты по нему	
				/* this.foods = this.foodService.getAllFoodsBySearchTerm(params.searchTerm); */
				foodsObservalbe = this.foodService.getAllFoodsBySearchTerm(params.searchTerm);
			else if (params.tag)				
			// если пришёл параметр тега, фильтруем продукты по нему	
				/* this.foods = this.foodService.getAllFoodsByTag(params.tag); */
				foodsObservalbe = this.foodService.getAllFoodsByTag(params.tag);
			else 
			/* this.foods = foodService.getAll(); */
			foodsObservalbe = foodService.getAll();

			foodsObservalbe.subscribe((serverFoods) => {
				
          this.foods = serverFoods;
		  })
			
		})
		
	}
}
