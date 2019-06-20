import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as SC from 'soundcloud';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {
  //CORS solution
  proxyUrl: any = "https://cors-anywhere.herokuapp.com/";
  soundcloudData: any;
  songLink: any;
  fixedSongLink: any;
  constructor(private http: HttpClient) { }

  

  ngOnInit() {
    // this.soundcloudData = this.getData()
    // .subscribe((data) => {
    //   console.log(data);
    //   let afterUriUrl;
    //   this.http.get(data).subscribe(afterUriURL => 
    //     afterUriUrl = afterUriURL
    //     );
    //   // this.songLink = `${data}${'/stream?client_id=SFNLsjZPQQvfdBJkLNKMJPYhkG55YImu'}`;
    //   console.log(afterUriUrl)

    //   // console.log(this.songLink);  
    // })

    SC.initialize({
      client_id: "SFNLsjZPQQvfdBJkLNKMJPYhkG55YImu"
    })


  }

  getData(): Observable<any> {
    return this.http.get<any>(`${this.proxyUrl}http://api.soundcloud.com/tracks/323918144?client_id=SFNLsjZPQQvfdBJkLNKMJPYhkG55YImu`);
  }

  onPlaySong() {
    return SC.stream('/tracks/323918144').then(function(player){
      player.play();
      console.log(player)
    });

  }
}
