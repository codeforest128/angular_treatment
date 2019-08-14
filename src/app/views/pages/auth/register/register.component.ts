// Angular
import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// Translate
import { TranslateService } from '@ngx-translate/core';
// NGRX
import { Store } from '@ngrx/store';
import { AppState } from '../../../../core/reducers';
// Auth
import { AuthNoticeService, AuthService, Register, User } from '../../../../core/auth/';
import {EMPTY, Subject} from 'rxjs';
import { ConfirmPasswordValidator } from './confirm-password.validator';

import { AuthService as authService } from '../../../../core/services/auth.service';

@Component({
	selector: 'kt-register',
	templateUrl: './register.component.html',
	encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit, OnDestroy {
	registerForm: FormGroup;
	loading = false;
	isRppsFound = false;
	errors: any = [];

	private unsubscribe: Subject<any>; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

	/**
	 * Component constructor
	 *
	 * @param authNoticeService: AuthNoticeService
	 * @param translate: TranslateService
	 * @param router: Router
	 * @param auth: AuthService
	 * @param store: Store<AppState>
	 * @param fb: FormBuilder
	 * @param cdr
	 */
	constructor(
		private authNoticeService: AuthNoticeService,
		private translate: TranslateService,
		private router: Router,
		private auth: AuthService,
		private store: Store<AppState>,
		private fb: FormBuilder,
		private cdr: ChangeDetectorRef,
		private authService: authService
	) {
		this.unsubscribe = new Subject();
	}

	/*
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
    */

	/**
	 * On init
	 */
	ngOnInit() {
		this.initRegisterForm();
	}

	/*
    * On destroy
    */
	ngOnDestroy(): void {
		this.unsubscribe.next();
		this.unsubscribe.complete();
		this.loading = false;
	}

	/**
	 * Form initalization
	 * Default params, validators
	 */
	initRegisterForm() {
		this.registerForm = this.fb.group({
			rpps_id: ['', Validators.compose([
				Validators.required
			])
		],
			name: ['', Validators.compose([
				Validators.required,
			]),
			],
			firstname: ['', Validators.compose([
				Validators.required,
			])
			],
			email: ['', Validators.compose([
				Validators.email,
				Validators.minLength(3),
				// https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
				Validators.maxLength(320)
			]),
			],
			password: ['', Validators.compose([
				Validators.minLength(3),
				Validators.maxLength(100)
			])
			],
			confirmPassword: ['', Validators.compose([
				Validators.minLength(3),
				Validators.maxLength(100)
			])
			],
			agree: [false, Validators.compose([Validators.required])]
		}, {
			validator: ConfirmPasswordValidator.MatchPassword
		});
		this.registerForm.get('firstname').disable();
		this.registerForm.get('name').disable();
		this.registerForm.get('email').disable();
		this.registerForm.get('password').disable();
		this.registerForm.get('confirmPassword').disable();
	}

	/**
	 * Form Submit
	 */
	submit() {
		this.authNoticeService.clear();
		this.registerForm.get('email').setValidators([Validators.required]);
		const controls = this.registerForm.controls;

		// check form
		if (this.registerForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			return;
		}

		this.loading = true;

		if (!controls['agree'].value) {
			// you must agree the terms and condition
			// checkbox cannot work inside mat-form-field https://github.com/angular/material2/issues/7891
			this.authNoticeService.setNotice('Vous devez accepter les conditions d\'utilisation', 'danger');
			this.loading = false;
			this.cdr.detectChanges();
			return;
		}

		const _user: User = new User();
		_user.clear();
		_user.email = controls['email'].value;
		_user.fullname = controls['firstname'].value + ' ' + controls['name'].value;
		_user.firstName = controls['firstname'].value;
		_user.lastName = controls['name'].value;
		_user.password = controls['password'].value;
		_user.rppsId = controls['rpps_id'].value;
		_user.roles = [];

		this.authService.signupAnesth(_user)
			.subscribe((
				user: User) => {
					this.store.dispatch(new Register({authToken: user.accessToken}));
					// pass notice message to the login page
					this.authNoticeService.setNotice(this.translate.instant('AUTH.REGISTER.SUCCESS'), 'success');
					this.router.navigateByUrl('/auth/login');
				},
				error => {
				if (error.error) {
					if (error.error.error.indexOf('rppsId') !== -1) {
						this.authNoticeService.setNotice('Cet ID RPPS est deja enregistré', 'danger');
					} else if (error.error.error.indexOf('email') !== -1) {
						this.authNoticeService.setNotice('Cet adresse email est deja utilisée', 'danger');
					}
				} else {
					// TODO warn dev team
					this.authNoticeService.setNotice('Une erreur est survenue, nous travaillons dessus', 'danger');
					console.log(JSON.stringify(error));
				}
					this.loading = false;
					this.cdr.detectChanges();
				});
	}

	rppsHasChanged() {
		this.isRppsFound = false;
		this.cdr.detectChanges();
	}

	findRPPS() {
		this.authNoticeService.clear();
		this.authService.findRPPS(this.registerForm.get('rpps_id').value).subscribe(result => {
			console.log(result);
			if (result.length && result.length === 1) {
				this.registerForm.get('firstname').setValue(result[0].pro_firstname);
				this.registerForm.get('name').setValue(result[0].pro_name);
				this.registerForm.get('email').enable();
				this.registerForm.get('password').enable();
				this.registerForm.get('confirmPassword').enable();
				this.isRppsFound = true;
				this.cdr.detectChanges();
			} else {
				this.authNoticeService.setNotice('Aucun professionel de santé trouvé correspondant à ce numéro RPPS', 'danger');
			}
		});
	}

	/**
	 * Checking control validation
	 *
	 * @param controlName: string => Equals to formControlName
	 * @param validationType: string => Equals to valitors name
	 */
	isControlHasError(controlName: string, validationType: string): boolean {
		const control = this.registerForm.controls[controlName];
		if (!control) {
			return false;
		}

		const result = control.hasError(validationType) && (control.dirty || control.touched);
		return result;
	}
}
