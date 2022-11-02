import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../services/product.service";
import {ProductModelServer, ServerResponse} from "../../models/product.model";
import {Router} from "@angular/router";
import {CartService} from "../../services/cart.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products: ProductModelServer[] = [];

  constructor(private  productService: ProductService,
              private router: Router,
              private cartService: CartService) { }

  ngOnInit(): void {
    // @ts-ignore
    this.productService.getAllProducts().subscribe((prods: ServerResponse) => {
      this.products = prods.products;
    });
  }

  selectProduct(id: number) {
    this.router.navigate([`/product`, id]).then();
  }

  selectCategory(catName: string) {
    this.router.navigate([`/category`, catName]).then();
  }

  AddToCart(id: number) {
    this.cartService.AddProductToCart(id);
  }

}
