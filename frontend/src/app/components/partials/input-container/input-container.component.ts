import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleComponent } from '../title/title.component';
import { InputValidationComponent } from '../input-validation/input-validation.component';
import { TextInputComponent } from '../text-input/text-input.component';
import { DefaultButtonComponent } from '../default-button/default-button.component';

@Component({
  selector: 'input-container',
  standalone: true,
  imports: [CommonModule, TitleComponent, InputValidationComponent, TextInputComponent, DefaultButtonComponent],
  templateUrl: './input-container.component.html',
  styleUrl: './input-container.component.css'
})
export class InputContainerComponent {

	@Input()
	label!:string;
	@Input()
	bgColor = 'white';

}
