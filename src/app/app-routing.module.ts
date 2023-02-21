import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductComponent} from "./shared/components/product/product.component";

const routes: Routes = [
  {
    path: '',
    children: [
      {path:'',loadChildren:()=>import('./views/main/main.module').then(m=>m.MainModule)},
      {path:'order',loadChildren:()=>import('./views/order/order.module').then(m=>m.OrderModule)},
      {path:'products',loadChildren:()=>import('./views/products/products.module').then(m=>m.ProductsModule)},
    ]
  },
  {path: 'product', component: ProductComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor() {

  }
}
