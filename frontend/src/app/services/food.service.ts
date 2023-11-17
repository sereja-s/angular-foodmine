import { Injectable } from '@angular/core';
import { Food } from '../shared/models/Food';
import { sample_foods } from '../../data';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

	constructor() { }
	
	/** 
	 * Получим все продукты из data.ts(для тестов) 
	 */ 
	getAll(): Food[]{
		return sample_foods;
	}

	/** 
	 * Организуем поиск по товарам
	 * на вход: searchTerm- поисковый запрос
	*/
	getAllFoodsBySesrchTerm(searchTerm: string) {

		return this.getAll().filter(food => food.name.toLowerCase().includes(searchTerm.toLowerCase()))
	}

}
