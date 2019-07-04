import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUser: any;

  constructor(private http: HttpClient, private authService: AuthService) {}

  getCurrentUser() {
    let jwtToken = this.authService.getJwtToken();

    return this.http.get<any>("http://localhost:5000/api/user/getCurrentUser");
  }


}
