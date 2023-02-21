import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {ProductService} from "../../services/product.service";
import {TeaType} from "../../../../types/tea.type";
import {CartProductService} from "../../services/cart-product.service";

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {
  product: TeaType;
  subscription: Subscription | null = null;

  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute, private router: Router, private cartProduct: CartProductService) {
    this.product = {
      id: 0,
      image: '',
      title: '',
      price: 0,
      description: ''
    }
  }

  ngOnInit() {
    this.subscription = this.activatedRoute.queryParams.subscribe((params) => {
      if (params['id']) {
        this.productService.getTeaItem(params['id']).subscribe(
          {
            next: (data) => {
              this.product = data;
            },
            error: (error) => {
              this.router.navigate(['/']);
            }
          }
        )
      }
    })
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  addToOrder() {
    this.cartProduct.title = this.product.title;
  }
}
