import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getCurrentUser().subscribe(res => console.log(res));
  }

}
