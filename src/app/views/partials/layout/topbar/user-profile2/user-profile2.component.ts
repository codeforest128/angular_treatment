// Angular
import { Component, OnInit } from '@angular/core';
// RxJS
import { Observable } from 'rxjs';
// NGRX
import { select, Store } from '@ngrx/store';
// State
import { AppState } from '../../../../../core/reducers';
import { currentUser, Logout, User } from '../../../../../core/auth';
import { Router } from '@angular/router';

@Component({
	selector: 'kt-user-profile2',
	templateUrl: './user-profile2.component.html',
})
export class UserProfile2Component implements OnInit {
	// Public properties
	user: any;

	/**
	 * Component constructor
	 *
	 * @param store: Store<AppState>
	 */
	constructor(
		private router: Router
	) {
	}

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	ngOnInit(): void {
		this.user = JSON.parse(localStorage.getItem('user'));
	}

	/**
	 * Log out
	 */
	logout() {
		localStorage.removeItem('accessToken');
		localStorage.removeItem('user');
		this.router.navigateByUrl('/auth/login');
	}
}
