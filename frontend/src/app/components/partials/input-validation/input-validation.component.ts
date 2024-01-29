import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl } from '@angular/forms';

const VALIDATORS_MESSAGES:any = {
	required:'Поле обязательное для заполнения',
	email: 'Email указан не корректно',
	minlength: 'Field is too short',
	notMatch: 'Password and Confirm does not match'
 }

@Component({
  selector: 'input-validation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './input-validation.component.html',
  styleUrl: './input-validation.component.css'
})
export class InputValidationComponent implements OnInit, OnChanges {

	@Input()
	control!: AbstractControl;
	@Input()
	showErrorsWhen: boolean = true;
	errorMessages: string[] = [];

	constructor() { }	

	ngOnChanges(changes: SimpleChanges): void {

		this.checkValidation();
	}

	ngOnInit(): void {
		this.control.statusChanges.subscribe(() => {
		  this.checkValidation();
		});
		this.control.valueChanges.subscribe(() => {
		  this.checkValidation();
		})
	 }
	
	/** 
	 * Метод проверки наличия сообщений об ошибках
	*/
	checkValidation() {
	  
	  const errors = this.control.errors;
	  
	if(!errors){
	  this.errorMessages = [];
	  return;
	}

	const errorKeys = Object.keys(errors);
	this.errorMessages = errorKeys.map(key => VALIDATORS_MESSAGES[key]);
 }

}
