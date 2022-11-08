import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {map} from "rxjs";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  myUser: any;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.userData$.pipe(map(user => {
      return user;
    })).subscribe((data) => {
      this.myUser = data;
    })
  }

  logout() {
    this.authService.logout();
  }
}
