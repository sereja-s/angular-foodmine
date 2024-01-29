import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TitleComponent } from "../../partials/title/title.component";
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { InputContainerComponent } from "../../partials/input-container/input-container.component";
import { InputValidationComponent } from '../../partials/input-validation/input-validation.component';
import { TextInputComponent } from "../../partials/text-input/text-input.component";
import { DefaultButtonComponent } from '../../partials/default-button/default-button.component';

@Component({
    selector: 'app-login-page',
    standalone: true,
    templateUrl: './login-page.component.html',
    styleUrl: './login-page.component.css',
    imports: [CommonModule, ReactiveFormsModule, TitleComponent, InputContainerComponent, InputValidationComponent, TextInputComponent, DefaultButtonComponent, RouterLink]
})
export class LoginPageComponent implements OnInit {

	loginForm!: FormGroup;
	// поле(свойство) показывает нажал ли пользователь кнопку отправки формы
	isSubmitted = false;
	// поле(свойство) с именем возврата URL-адреса (чтобы вернуть пользователя на ту сраницу где он был ранее, после завершения процесса входа)
	returnUrl = '';

	constructor(private formBuilder: FormBuilder, private userService:UserService, private activatedRoute:ActivatedRoute,
		private router:Router) {}
	
	ngOnInit(): void {

		this.loginForm = this.formBuilder.group({
			// элементы управления (контроля) формой
			email: ['', [Validators.required, Validators.email]],
			password: ['', Validators.required]
		});

		// возвращаемый url-адрес-последнее значение активированного маршрута(моментальный снимок)
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
			password: this.fc.password.value
			// подпишемся после успешного входа в систему
		}).subscribe(() => {
				// вернём пользователя туда где он был раньше
				this.router.navigateByUrl(this.returnUrl);
			 });
	}

}
