import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NewsApiService } from '../../services/news-api.service';
import { filter, map, subscribeOn } from 'rxjs/operators';

// import { SwiperComponent, SwiperDirective, SwiperConfigInterface,
//   SwiperScrollbarInterface, SwiperPaginationInterface } from 'ngx-swiper-wrapper';
import { NguCarouselConfig } from '@ngu/carousel';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {
  mainNews: any[] = [];
  techNews: any[] = [];



  constructor(private http: HttpClient, private newsApiService: NewsApiService) {

  }

  ngOnInit() {
    this.getMainNews();
    this.getTechNews();
  }

  getMainNews() {
    this.newsApiService.getData()
      .pipe(map(results => {
        return results.articles;
      }))
      .subscribe((res) => {
        this.mainNews = res;
      })
  }

  getTechNews() {
    this.newsApiService.getData2()
      .pipe(map((results) => {
        return results.articles;
      }))
      .subscribe((res) => {
        this.techNews = res;
      })
  }

}
