import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

import { UserRegister, UserLogin } from '../models/user.model';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userRegister: UserRegister;
  private userLogin: UserLogin;

  authChange = new Subject<boolean>();

  constructor(private router: Router, private http: HttpClient, private snackBar: MatSnackBar) { }

  getJwtToken() {
    return localStorage.getItem('jwtToken');
  }

  registerUser(user: UserRegister) {
    let { username, email, password, passwordConfirm } = user;
    this.userRegister = {
      username,
      email,
      password,
      passwordConfirm
    };
    return this.http.post<any>(`${environment.apiURL}/auth/register`, this.userRegister);
  }

  persistLogin() {
    const loggedIn = localStorage.getItem('jwtToken');
    if (!loggedIn) {
      return;
    } else {
      this.authChange.next(true);
    }
  }

  loginUser(user: UserLogin) {
    let { email, password, tfaToken } = user;
    this.userLogin = {
      email,
      password,
      tfaToken
    };

    return this.http.post<any>(`${environment.apiURL}/auth/login`, this.userLogin)
      .pipe(
        tap(response => {
          if (response.status === 200) {
            let token = response.accessToken;
            localStorage.setItem('jwtToken', token)
            this.authChange.next(true);
          };
        })
      )
  }

  logout() {
    this.userLogin = null;
    this.authChange.next(false);
    localStorage.removeItem('jwtToken');
    this.router.navigate(['/login']);

    this.snackBar.open('You are logged out.', 'Close', {
      panelClass: 'login-snackbar',
      duration: 3000
    })
  }

  isJwtAuth(): boolean {
    if (localStorage.getItem('jwtToken') !== null) {
      return true;
    }
  }

}
