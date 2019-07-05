import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TfaService {
  jwtToken: any;
  authCode: any;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.jwtToken = this.authService.getJwtToken();
  }

  tfaEnable() {
    return this.http.post<any>("http://localhost:5000/api/tfa/setup", {});
  }

  tfaEnableVerify(authCode) {
    this.authCode = authCode;
    return this.http.post<any>("http://localhost:5000/api/tfa/verify", {token: this.authCode});
  }

  tfaDisable() {
    return this.http.post<any>("http://localhost:5000/api/tfa/delete", {});
  }

}
