import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MatSnackBar } from '@angular/material';

import { UserRegister, UserLogin } from '../models/auth/user.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private helper = new JwtHelperService();

  private currentUser: any;
  private userRegister: UserRegister;
  private userLogin: UserLogin;
  authChange = new Subject<boolean>();

  constructor(private router: Router, private http: HttpClient, private snackBar: MatSnackBar) { }

  getToken() {
    return localStorage.getItem('jwtToken');
  }

  getCurrentUser() {
    const token = this.getToken()
    const decodedToken = this.helper.decodeToken(token);
    this.currentUser = decodedToken;
    return this.currentUser;
  }

  registerUser(authData: UserRegister) {
    this.userRegister = {
      username: authData.username,
      email: authData.email,
      password: authData.password,
      passwordConfirm: authData.passwordConfirm
    };
    return this.http.post<any>('http://localhost:5000/api/auth/register', this.userRegister);
  }

  loginUser(authData: UserLogin) {
    this.userLogin = {
      email: authData.email,
      password: authData.password,
    };
    return this.http.post<string>('http://localhost:5000/api/auth/login', this.userLogin)
      .pipe(tap(token => {
        localStorage.setItem('jwtToken', token)
        this.authChange.next(true);
      }));
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

  isAuth(): boolean {
    return localStorage.getItem('jwtToken') !== null;
  }
}
