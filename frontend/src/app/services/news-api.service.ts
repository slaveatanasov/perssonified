import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { NewsApiData } from '../models/data.model';

@Injectable({
  providedIn: 'root'
})
export class NewsApiService {
  topHeadlinesBaseUrl: string = 'https://newsapi.org/v2/top-headlines?';
  everythingBaseUrl: string = 'https://newsapi.org/v2/everything?';
  qMark: string = "?";
  subsequentParam: string = "&"
  countryParam: string = "country=us";
  techParam: string = "category=technology";

  constructor(private http: HttpClient) { }

  getMainNews() {
    return this.http.get<NewsApiData>(this.topHeadlinesBaseUrl + this.countryParam).pipe(
      map(data => {
      return data.articles;
    }));
  }

  getTechNews() {
    return this.http.get<NewsApiData>(this.topHeadlinesBaseUrl + this.countryParam + this.subsequentParam + this.techParam).pipe(
      map(data => {
      return data.articles;
    }));
  }
  
}