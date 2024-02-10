import { Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { FoodPageComponent } from './components/pages/food-page/food-page.component';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';
import { CheckoutPageComponent } from './components/pages/checkout-page/checkout-page.component';
import { authGuard } from './auth/guards/auth.guard';

export const routes: Routes = [
	// маршрут по умолчанию
	{ path: '', component: HomeComponent },
	// маршрут поиска
	{ path: 'search/:searchTerm', component: HomeComponent },
	// маршрут для тега
	{ path: 'tag/:tag', component: HomeComponent },
	// маршрут для страницы товара
	{ path: 'food/:id', component: FoodPageComponent },
	// маршрут к странице корзины
	{ path: 'cart-page', component: CartPageComponent },
	// маршрут к странице авторизации
	{ path: 'login', component: LoginPageComponent },
	// маршрут к странице регистрации
	{ path: 'register', component: RegisterPageComponent },
	// маршрут к странице оформления заказа
	{ path: 'checkout', component: CheckoutPageComponent, canActivate: [authGuard] },
];
