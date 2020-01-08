import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { AuthService } from '../services/auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  

  constructor(private http: HttpClient, private authService: AuthService) {}

  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', }), responseType: 'text' as 'json' };

  getCurrentUser() {
    return this.http.get<any>(`${environment.apiURL}/user/getCurrentUser`, this.httpOptions);
  }


}
