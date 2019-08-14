// Angular
import { Component } from '@angular/core';
import { HeaderService } from '../../../../../core/services/header.service';
import { map } from 'rxjs/operators';
import { Pathology } from '../../../../../core/classes/consultation_class';

@Component({
	selector: 'kt-topbar',
	templateUrl: './topbar.component.html',
	styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent {
	saveAction$;
	allergies$;

	constructor(
		private headerService: HeaderService,
	) {
		this.saveAction$ = this.headerService.saveAction$;
		this.allergies$ = this.headerService.allergies$.pipe(
			map((values: Pathology[]) => {
				if (!values) {
					return null;
				}

				if (values.length > 3) {
					values = values.slice(0, 3);
					values.push({display_name: '...'} as Pathology);
				}

				return values.map(a => a.display_name).join(', ');
			})
		);
	}
}
