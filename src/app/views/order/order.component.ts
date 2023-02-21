import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {catchError, Subscription, tap} from "rxjs";
import {CartProductService} from "../../shared/services/cart-product.service";
import {OrderService} from "../../shared/services/order.service";

@Component({
  selector: 'order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, OnDestroy {
  orderForm = this.fb.group({
    name: ['', [Validators.required, Validators.pattern('^[A-Za-zА-Яа-я]+$')]],
    surname: ['', [Validators.required, Validators.pattern('^[A-Za-zА-Яа-я]+$')]],
    phone: ['', [Validators.required, Validators.pattern('^[+]?[0-9]{11}$'), Validators.maxLength(12)]],
    country: ['', [Validators.required, Validators.pattern('^[A-Za-zА-Яа-я]+$')]],
    zip: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    address: ['', [Validators.required, Validators.pattern(new RegExp(/^[A-Za-zА-Яа-я-/\d\s]+$/))]],
    product: ['', [Validators.required, Validators.pattern(this.cartProduct.title)]],
    comment: ['']
  });
  formShow: boolean = true;
  orderSuccess: boolean = false;
  orderError: boolean = false;
  subscription: Subscription | null = null;

  get name() {
    return this.orderForm.get('name');
  }

  get surname() {
    return this.orderForm.get('surname');
  }

  get phone() {
    return this.orderForm.get('phone');
  }

  get country() {
    return this.orderForm.get('country');
  }

  get zip() {
    return this.orderForm.get('zip');
  }

  get address() {
    return this.orderForm.get('address');
  }

  get product() {
    return this.orderForm.get('product');
  }

  constructor(private cartProduct: CartProductService, private fb: FormBuilder, private http: HttpClient, private orderService: OrderService) {
  }


  ngOnInit() {
    this.orderForm.patchValue({
      product: this.cartProduct.title,
    })
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  createOrder() {
    const data = {
      name: this.orderForm.controls.name.value,
      last_name: this.orderForm.controls.surname.value,
      phone: this.orderForm.controls.phone.value,
      country: this.orderForm.controls.country.value,
      zip: this.orderForm.controls.zip.value,
      product: this.orderForm.controls.product.value,
      address: this.orderForm.controls.address.value,
      comment: this.orderForm.controls.comment.value,
    }
    this.subscription = this.orderService.createOrder(data)
      .subscribe((response) => {
        if (response.success && !response.message) {
          this.formShow = false;
          this.orderSuccess = true;
        } else {
          this.orderError = true;
          setTimeout(() => {
            this.orderError = false;
          }, 3000)
        }
      })
  }
}
