import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent {

	// опишем входные параметры
	@Input()
	visible = false;
	@Input()
	notFoundMessage = "По вашему запросу ничего не найдено";
	@Input()
	resetLinkText = "Начать сначала";
	@Input()
	resetLinkRoute = "/";
	constructor() { }

}
