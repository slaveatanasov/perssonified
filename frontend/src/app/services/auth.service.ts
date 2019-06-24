import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/auth/user.model';
import { AuthData } from '../models/auth/auth-data.model';

import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: User;
  authChange = new Subject<boolean>();
  
  constructor(private router: Router) {}

  registerUser(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 1000).toString()
    };
    this.authChange.next(true);
    this.router.navigate(["/dashboard"]);
  }

  loginUser(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 1000).toString()
    };
    this.authChange.next(true);
    this.router.navigate(["/dashboard"]);
  }

  logout() {
    this.user = null;
    this.authChange.next(false);
    this.router.navigate(["/login"]);
  }

  getUser() {
    return {...this.user}
  }

  isAuth() {
    return this.user != null;
  }
}
