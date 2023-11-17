import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {

	// добавили поле поискового запроса и добавили значение по умолчанию
	searchTerm = '';

	constructor(activatedRoute: ActivatedRoute, private router: Router) {

		activatedRoute.params.subscribe((params) => {

			if (params.searchTerm) this.searchTerm = params.searchTerm;
		});
	}

	search(term: string): void {
		
		if (term)
			this.router.navigateByUrl('/search/' + term);
	}
}
