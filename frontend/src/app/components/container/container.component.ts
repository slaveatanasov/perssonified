import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NewsApiService } from '../../services/news-api.service';
import { filter, map, subscribeOn } from 'rxjs/operators';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {

  state: any[] = [];
  state2: any[] = [];

  constructor(private http: HttpClient, private newsApiService: NewsApiService) {

  }

  ngOnInit() {
    this.getNews();
    this.getTech();
  }

  getNews() {
    this.newsApiService.getData()
      .pipe(map(results => {
        return results.articles;
      }))
      .subscribe((res) => {
        console.log(res);
        this.state = res;
      })
  }

  getTech() {
    this.newsApiService.getData2()
      .pipe(map((results) => {
        return results.articles;
      }))
      .subscribe((res) => {
        this.state2 = res;
        console.log(this.state2)
      })
  }


}
