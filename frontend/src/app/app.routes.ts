import { Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { FoodPageComponent } from './components/pages/food-page/food-page.component';

export const routes: Routes = [

	// маршрут по умолчанию
	{ path: '', component: HomeComponent },
	// маршрут поиска
	{ path: 'search/:searchTerm', component: HomeComponent },
	// маршрут для тега
	{ path: 'tag/:tag', component: HomeComponent },
	// маршрут для страницы товара
	{ path: 'food/:id', component: FoodPageComponent },
];
