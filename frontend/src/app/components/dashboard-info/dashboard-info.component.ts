import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-dashboard-info',
  templateUrl: './dashboard-info.component.html',
  styleUrls: ['./dashboard-info.component.scss']
})
export class DashboardInfoComponent implements OnInit {
  loading: boolean;
  currentUsername: any;
  currentUserCreatedAt: any;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.loading = true;
    this.userService.getCurrentUser().subscribe(user => {
      this.currentUsername = user.username;
      this.currentUserCreatedAt = user.createdAt;
      this.loading = false;
    }, 
      error => console.log(error)
    );
  }

}
