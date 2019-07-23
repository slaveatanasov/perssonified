import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

import { UserRegister, UserLogin } from '../models/auth/user.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userRegister: UserRegister;
  private userLogin: any;

  authChange = new Subject<boolean>();

  constructor(private router: Router, private http: HttpClient, private snackBar: MatSnackBar) { }

  getJwtToken() {
    return localStorage.getItem('jwtToken');
  }

  registerUser(data: UserRegister) {
    let { username, email, password, passwordConfirm } = data;
    this.userRegister = {
      username,
      email,
      password,
      passwordConfirm
    };
    return this.http.post<any>('http://localhost:5000/api/auth/register', this.userRegister);
  }

  loginUser(data) {
    let { email, password, tfaToken } = data;
    this.userLogin = {
      email,
      password,
      tfaToken
    };

    return this.http.post<any>('http://localhost:5000/api/auth/login', this.userLogin).pipe(
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
