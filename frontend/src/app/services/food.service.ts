import { Injectable } from '@angular/core';
import { Food } from '../shared/models/Food';
import { sample_foods, sample_tags } from '../../data';
import { Tag } from '../shared/models/Tag';

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
	getAllFoodsBySearchTerm(searchTerm: string) {

		return this.getAll().filter(food => food.name.toLowerCase().includes(searchTerm.toLowerCase()))
	}

	/** 
	 * Получим все теги из массива тегов объектов
	*/
	getAllTags(): Tag[] {

		return sample_tags;
	}

	/** 
	 * Получим все продукты по определённому тегу
	*/
	getAllFoodsByTag(tag: string): Food[] {		

		return tag === "All" ? this.getAll() : this.getAll().filter(food => food.tags?.includes(tag));
	}

	/** 
	 * Получим продукт по id
	*/
	getFoodById(foodId: string): Food{
		
		return this.getAll().find(food => food.id == foodId) ?? new Food();
	 }

}
