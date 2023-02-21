import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';
import {ProductsComponent} from "./products.component";
import {SharedModule} from "../../shared/shared.module";
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [
    ProductsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ProductsRoutingModule
  ],
  exports:[
    ProductsRoutingModule
  ]
})
export class ProductsModule { }
