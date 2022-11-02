import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../services/product.service";
import {ProductModelServer, ServerResponse} from "../../models/product.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products: ProductModelServer[] = [];

  constructor(private  productService: ProductService) { }

  ngOnInit(): void {
    // @ts-ignore
    this.productService.getAllProducts().subscribe((prods: ServerResponse) => {
      this.products = prods.products;
    });
  }

  selectProduct(id: number) {

  }

  selectCategory(catName: string) {

  }

  AddToCart(id: number) {

  }

}
