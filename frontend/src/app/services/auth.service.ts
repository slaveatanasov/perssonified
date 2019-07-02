import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { tap, map } from 'rxjs/operators';
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

  //Get current user info from request from backend not from token....

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
      .pipe(map(token => {
        localStorage.setItem('jwtToken', token)
        this.authChange.next(true);
        console.log('before const decodedToken')
        const decodedToken = this.helper.decodeToken(token);
        console.log(decodedToken);
      }))
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
      return true
    }
    // return localStorage.getItem('jwtToken') !== null
  }

  isTfaEnabled(): boolean {
    const token = localStorage.getItem('jwtToken')
    const decodedToken = this.helper.decodeToken(token);
    console.log(decodedToken)
    return decodedToken.tfaEnabled !== 0
  }

  isTfaAuth(): boolean {
    // implement.. temporary false is hardcoded
    return true

  }

}
