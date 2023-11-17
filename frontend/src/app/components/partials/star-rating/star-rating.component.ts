import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'star-rating',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.css'
})
export class StarRatingComponent {

	@Input()

	stars!: number;

	@Input()

	size: number = 1;

	
	public get styles() {
		return {

			'width.rem': this.size,
			'height.rem': this.size,
			'marginRight.rem': this.size / 6,
		}
	}
	
	/**
	 * Функция для получения правильного имени для картинки звезды
	 * @param current 
	 */
	getStarImage(current: number): string{

		const previousHalf = current - 0.5;
		const imageName =  
		this.stars >= current ? 'star-full'
				: this.stars >= previousHalf ? 'star-half' : 'star-empty'
		
		return `/assets/stars/${imageName}.svg`
	}

}
