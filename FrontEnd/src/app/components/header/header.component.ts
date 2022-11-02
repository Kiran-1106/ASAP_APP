import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {CartService} from "../../services/cart.service";
import {CartModelServer} from "../../models/cart.model";

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

  constructor(public cartService: CartService,
              private userService: UserService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.cartService.cartTotal$.subscribe(total => this.cartTotal = total);

    this.cartService.cartData$.subscribe(data => this.cartData = data);

    this.userService.authState$.subscribe(authState => this.authState = authState);
  }

  selectCategory(catName: string) {
    this.router.navigate([`/category`, catName]).then();
  }

}
