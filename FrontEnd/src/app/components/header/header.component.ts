import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  // @ts-ignore
  cartData: CartModelServer;
  // @ts-ignore
  cartTotal: number;
  // @ts-ignore
  authState: boolean;
  cartService: any;

  constructor(private userService: UserService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.userService.authState$.subscribe(authState => this.authState = authState);
  }

  selectCategory(catName: string) {

  }

}
