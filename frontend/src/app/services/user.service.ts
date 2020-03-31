import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  getCurrentUser() {
    return this.http.get<User>(`${environment.apiURL}/user/getCurrent`);
  }

  updateUser(username: string, email: string) {
    return this.http.put<{updated: boolean}>(`${environment.apiURL}/user`, {username, email });
  }
  
}