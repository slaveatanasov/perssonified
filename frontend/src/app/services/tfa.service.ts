import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TfaService {

  constructor(private http: HttpClient) {
  }

  tfaEnable() {
    return this.http.post<any>(`${environment.apiURL}/tfa/setup`, {});
  }

  tfaEnableVerify(authCode) {
    return this.http.post<any>(`${environment.apiURL}/tfa/verify`, {token: authCode});
  }

  tfaDisable() {
    return this.http.post<any>(`${environment.apiURL}/tfa/delete`, {});
  }

}
