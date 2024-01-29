import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleComponent } from '../../partials/title/title.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Router, RouterLink} from '@angular/router';
import { PasswordsMatchValidator } from '../../../shared/validators/password_match_validator';
import { IUserRegister } from '../../../shared/interfaces/IUserRegister';
import { TextInputComponent } from '../../partials/text-input/text-input.component';
import { DefaultButtonComponent } from '../../partials/default-button/default-button.component';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [CommonModule, TitleComponent, TextInputComponent, DefaultButtonComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent implements OnInit {

	// добавим форму регистрации
	registerForm!: FormGroup;
	// значение по умолчанию для отображения подтверждения отправки
	isSubmitted = false;
	// возвращаемый url-адрес
	returnUrl = '';

	constructor(private formBuilder: FormBuilder, private userService: UserService, private activatedRoute: ActivatedRoute,
		private router: Router) { }
	
	ngOnInit(): void {

		// создадим группу форм с помощью элементов управления формой
		this.registerForm = this.formBuilder.group({

			name: ['', [Validators.required, Validators.minLength(2)]],
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, Validators.minLength(3)]],
			confirmPassword: ['', Validators.required],
			address: ['', [Validators.required, Validators.minLength(5)]]
		},
			// передадим параметры для группы (здесь- для проверки совпадения пароля при повторном его вводе)
			{

				validators: PasswordsMatchValidator('password', 'confirmPassword')
			}
		);

		// полуим обратный url-адрес из параметров запроса внутри url-адреса с которого перешли на страницу регистрации
		this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl;
	}

	get fc() {

		return this.registerForm.controls;
	}

	submit() {

		this.isSubmitted = true;
		if (this.registerForm.invalid) {
			
			return;
		}

		const fv = this.registerForm.value;

		// cоздадим объект пользователь
		const user :IUserRegister = {
			name: fv.name,
			email: fv.email,
			password: fv.password,
			confirmPassword: fv.confirmPassword,
			address: fv.address
		};
		
		this.userService.register(user).subscribe(_ => {
			this.router.navigateByUrl(this.returnUrl);
		 })
	}

}
