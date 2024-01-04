import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TitleComponent } from "../../partials/title/title.component";
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-login-page',
    standalone: true,
    templateUrl: './login-page.component.html',
    styleUrl: './login-page.component.css',
    imports: [CommonModule, ReactiveFormsModule, TitleComponent]
})
export class LoginPageComponent {

	loginForm!: FormGroup;
	// поле(свойство) показывает нажал ли пользователь кнопку отправки формы
	isSubmitted = false;
	// поле(свойство) с именем возврата URL-адреса (чтобы вернуть пользователя на ту сраницу где он был ранее, после завершения процесса входа)
	returnUrl = '';

	constructor(private formBuilder: FormBuilder, private userService:UserService, private activatedRoute:ActivatedRoute,
		private router:Router) {
		
		this.loginForm = this.formBuilder.group({
			// элементы управления (контроля) формой
			email: ['', [Validators.required, Validators.email]],
			password: ['', Validators.required]
		});

		this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl;
		
	}

	/** 
	 * Метод-геттер (чтобы иметь удобный способ к элементам управления(контроля) формой)
	 */ 
	get fc() {

		return this.loginForm.controls; // теперь можем обращаться вместо LoginForm.controls.email просто fc.email
	}

	/** 
	 * Метод отправки
	*/
	submit(){

		this.isSubmitted = true;

		if (this.loginForm.invalid) return;

		/* alert(`email: ${this.fc.email.value}, password: ${this.fc.password.value}`) */
		this.userService.login({email: this.fc.email.value,
			password: this.fc.password.value}).subscribe(() => {
				this.router.navigateByUrl(this.returnUrl);
			 });
	}

}
