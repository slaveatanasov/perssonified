import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewsApiService {

  topHeadlinesBaseUrl: string = 'https://newsapi.org/v2/top-headlines?';
  everythingBaseUrl: string = 'https://newsapi.org/v2/everything?';
  qMark: string = "?";
  consequentParam: string = "&"
  countryParam: string = "country=us";
  techParam: string = "category=technology";

  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get<any>(this.topHeadlinesBaseUrl + this.countryParam);
  }

  getData2() {
    return this.http.get<any>(
      this.topHeadlinesBaseUrl +
      this.countryParam +
      this.consequentParam +
      this.techParam
    );
  }

}
