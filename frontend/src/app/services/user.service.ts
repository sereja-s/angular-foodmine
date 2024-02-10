import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../shared/models/User';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { HttpClient } from '@angular/common/http';
import { USER_LOGIN_URL, USER_REGISTER_URL } from '../shared/constants/urls';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from './storage.service';
import { IUserRegister } from '../shared/interfaces/IUserRegister';

const USER_KEY = 'User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

	// определим субъект пользователя, который имеет режим чтения и записи
	
	/* private userSubject = new BehaviorSubject<User>(new User()) */
	private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage());
	// опишем общедоступный наблюдаемый объект-это версия субъекта пользователя доступная только для чтения и предоставляется внешней стороне пользовательской службы
	public userObservable: Observable<User>;

	// http-запрос на сервер должен отправлять url-адрес входа пользователя (внедрим в конструктор http-клиент)
	constructor(private http:HttpClient, private toastrService:ToastrService, private localStorage: StorageService) {
	  
		this.userObservable = this.userSubject.asObservable();
  }

	// Part 17.1 - Checkout Page
  public get currentUser():User {
	return this.userSubject.value;
 }


	/** 
	 * Метод входа в систему авторизации, который имеет входные данные: имя входа пользователя с типом: интерфейс пользователя
	*/
	login(userLogin: IUserLogin):Observable<User>{
		
		return this.http.post<User>(USER_LOGIN_URL, userLogin).pipe(
			tap({
			  next: (user) =>{
				 this.setUserToLocalStorage(user);
				 this.userSubject.next(user);
				 this.toastrService.success(
					`Добро пожаловать в Foodmine ${user.name} !`,
					'Авторизация прошла успешно'
				 )
			  },
			  error: (errorResponse) => {
				 this.toastrService.error(errorResponse.error, 'Вы не авторизовались');
			  }
			})
		 );
	}

	register(userRegiser:IUserRegister): Observable<User>{
		return this.http.post<User>(USER_REGISTER_URL, userRegiser).pipe(
		  tap({
			 next: (user) => {
				this.setUserToLocalStorage(user);
				this.userSubject.next(user);
				this.toastrService.success(
				  `Welcome to the Foodmine ${user.name}`,
				  'Регистрация прошла успешно!'
				)
			 },
			 error: (errorResponse) => {
				this.toastrService.error(errorResponse.error,
				  'Регистрация не завершена!')
			 }
		  })
		)
	 }

	/**
	 * Метод выхода из системы авторизации
	 */
	logout(){
		this.userSubject.next(new User());
		this.localStorage.removeItem(USER_KEY);
		window.location.reload();
	 }
  
	 private setUserToLocalStorage(user:User){
		this.localStorage.setItem(USER_KEY, JSON.stringify(user));
	 }
  
	 private getUserFromLocalStorage():User{
		const userJson = this.localStorage.getItem(USER_KEY);
		if(userJson) return JSON.parse(userJson) as User;
		return new User();
	 }
}
