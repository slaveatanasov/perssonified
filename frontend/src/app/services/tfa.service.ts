import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TfaService {

  constructor(private http: HttpClient) {
  }

  tfaEnable() {
    return this.http.post<any>("http://localhost:5000/api/tfa/setup", {});
  }

  tfaEnableVerify(authCode) {
    return this.http.post<any>("http://localhost:5000/api/tfa/verify", {token: authCode});
  }

  tfaDisable() {
    return this.http.post<any>("http://localhost:5000/api/tfa/delete", {});
  }

}
