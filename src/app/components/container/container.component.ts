import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {
  soundcloudData: any;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.soundcloudData = this.getData().subscribe((data) => {
      console.log(data);
    })
  }

  getData(): Observable<any> {
    return this.http.get<any>('http://api.soundcloud.com/tracks/13158665?client_id=13158665');
  }
}
