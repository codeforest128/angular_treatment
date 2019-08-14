import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {tap} from 'rxjs/operators';
import {User} from '../auth';

@Injectable()
export class AuthService {
  private user: any = null;
  constructor(
    private http: HttpClient
  ) {}

  getUser() {
    if (!this.user) {
      const json = localStorage.getItem('user');
      if (json) {
        this.user = JSON.parse(json);
      }
    }

    return this.user;
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${environment.apiEndpoint}/signIn`, {
      email,
      password
    }).pipe(
      tap(({ user, token }: any) => {
        this.user = user;
        console.log(this.user);
        localStorage.setItem('accessToken', token);
        localStorage.setItem('user', JSON.stringify(user));
      })
    );
  }

  findRPPS(rpps_id): Observable<Array<any>> {
    return this.http.get(`${environment.apiEndpoint}/health_pro/${rpps_id}`) as Observable<Array<any>>;
  }

	signupAnesth(user: User): Observable<any> {
		return this.http.post(`${environment.apiEndpoint}/signUpAnesth`, user);
		// 	.pipe(
		// 	tap(({ token }: any) => {
		// 		// this.user = user;
		// 		// console.log(this.user);
		// 		// localStorage.setItem('accessToken', token);
		// 		// localStorage.setItem('user', JSON.stringify(user));
		// 	})
		// );
	}
}
