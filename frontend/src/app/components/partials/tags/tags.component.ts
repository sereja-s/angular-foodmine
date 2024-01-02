import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tag } from '../../../shared/models/Tag';
import { FoodService } from '../../../services/food.service';
import { RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-tags',
  standalone: true,
  imports: [CommonModule, RouterLink, HttpClientModule],
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.css'
})
export class TagsComponent {

	tags?: Tag[];
	
	constructor(foodService: FoodService) {

		/* this.tags = foodService.getAllTags(); */
		foodService.getAllTags().subscribe(serverTags => {

			this.tags = serverTags;
		 });
	  }
}
