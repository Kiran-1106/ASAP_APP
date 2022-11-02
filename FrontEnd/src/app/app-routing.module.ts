import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {RegisterComponent} from "./components/register/register.component";
import {ProductComponent} from "./components/product/product.component";

const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'product/:id', component: ProductComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
