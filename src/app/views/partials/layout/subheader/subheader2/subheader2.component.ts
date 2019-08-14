// Angular
import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// RxJS
import {Observable, Subscriber, Subscription} from 'rxjs';
// Layout
import { SubheaderService } from '../../../../../core/_base/layout';
import {Breadcrumb, GetPDFResponse} from '../../../../../core/_base/layout/services/subheader.service';

@Component({
	selector: 'kt-subheader2',
	templateUrl: './subheader2.component.html',
	styleUrls: ['./subheader2.component.scss']
})
export class Subheader2Component implements OnInit, OnDestroy, AfterViewInit {
	// Public properties
	today: number = Date.now();
	title: string = '';
	desc: string = '';
	breadcrumbs: Breadcrumb[] = [];
	action: () => void = null;
	consultationId;
	save_pdf_loading: Observable<boolean> = new Observable<boolean>(e => this.emitter_save_pdf_loading = e);

	// Private properties
	private subscriptions: Subscription[] = [];
	private emitter_save_pdf_loading: Subscriber<boolean>;

	/**
	 * Component constructor
	 *
	 * @param subheaderService: SubheaderService
	 */
	constructor(public subheaderService: SubheaderService, private router: Router, private ActivatedRoute: ActivatedRoute) {
	}

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	ngOnInit() {
	}

	/**
	 * After view init
	 */
	ngAfterViewInit(): void {

		this.getConsultationId();

		this.subscriptions.push(this.subheaderService.title$.subscribe(bt => {
			// breadcrumbs title sometimes can be undefined
			if (bt) {
				Promise.resolve(null).then(() => {
					this.title = bt.title;
					this.desc = bt.desc;
				});
			}
		}));

		this.subscriptions.push(this.subheaderService.breadcrumbs$.subscribe(bc => {
			Promise.resolve(null).then(() => {
				this.breadcrumbs = bc;
			});
		}));

		this.subscriptions.push(this.subheaderService.action$.subscribe(action => {
			this.action = action;
		}));
	}

	/**
	 * On destroy
	 */
	ngOnDestroy(): void {
		this.subscriptions.forEach(sb => sb.unsubscribe());
	}

	moveTo(path) {
		console.log(path);
		this.router.navigateByUrl(path);
	  }

	  getConsultationId() {
		  let path = this.router.url.split('/');
		  this.consultationId = parseInt(path[path.length - 1], 10);
		  return this.consultationId;
	  }

	callAction() {
		if (this.action) {
			this.action();
		}
	}

	saveConsultationToPDF() {
		let _this = this;
		this.emitter_save_pdf_loading.next(true);
		this.subheaderService.getConsultationPDF(this.getConsultationId()).subscribe((
			data: GetPDFResponse) => {
				_this.emitter_save_pdf_loading.next(false);
				if (data.url) {
					window.open(data.url);
				} else {
					console.log(data);
				}
			},
		error => {
			_this.emitter_save_pdf_loading.next(false);
			console.log(JSON.stringify(error));
		});
	}
}
