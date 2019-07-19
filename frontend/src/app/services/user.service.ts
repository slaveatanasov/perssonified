import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUser: any;

  constructor(private http: HttpClient, private authService: AuthService) {}

  getCurrentUser() {
    // let jwtToken = this.authService.getJwtToken();
    // console.log(jwtToken);

    this.currentUser = this.http.get<any>("http://localhost:5000/api/user/getCurrentUser", {observe: 'response'})
    .pipe(tap((res) => {
      console.log('in get current user in user service')
      console.log(res)
    }));
    return this.currentUser;
  }


}
