import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(private authService: UserService) { 
    // this.userService.getCurrentUser().subscribe(res => console.log(res));
    this.authService.getCurrentUser().subscribe(res => console.log(res));
  }

  ngOnInit() {

  }

}
