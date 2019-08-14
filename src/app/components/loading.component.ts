import { Component } from '@angular/core';
import { LoadingOverlayService } from '../core/services/loading-overlay.service';

@Component({
	selector: 'kt-loading-overlay',
	templateUrl: './loading.component.html',
	styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent  {
  isLoading$;

  constructor(
    private loadingOverlay: LoadingOverlayService
  ) {
    this.isLoading$ = this.loadingOverlay.isLoading$;
  }
}
