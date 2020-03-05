import { Component, OnInit } from '@angular/core';
import { NewsApiService } from '../../services/news-api.service';
import { map } from 'rxjs/operators';

import { Articles } from '../../models/data.model';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {
  mainNews: Articles[];
  techNews: Articles[];
  loading: boolean = false;

  constructor(private newsApiService: NewsApiService) { }

  ngOnInit() {
    this.getMainNews();
    this.getTechNews();
  }

  getMainNews() {
    this.loading = true;
    this.newsApiService.getMainNews()
      .pipe(map(data => {
        return data.articles;
      }))
      .subscribe(articles => {
        this.mainNews = articles;
        this.loading = false;
      })
  }

  getTechNews() {
    this.loading = true;
    this.newsApiService.getTechNews()
      .pipe(map(data => {
        return data.articles;
      }))
      .subscribe(articles => {
        this.techNews = articles;
        this.loading = false;
      })
  }

}