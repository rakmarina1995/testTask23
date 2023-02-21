import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Subject, Subscription, tap} from "rxjs";
import {ProductService} from "../../shared/services/product.service";
import {TeaType} from "../../../types/tea.type";

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  mainTitle: string = 'Наши чайные коллекции';
  catalogTea: TeaType[] | null = null;
  loading: boolean = false;
  searchResult: boolean = false;
  searchValue: string = '';
  subject: Subject<string>;
  subscriptionSubject: Subscription | null = null;
  subscriptionRoute: Subscription | null = null;
  subscriptionRequest: Subscription | null = null;

  constructor(private productService: ProductService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.subject = new Subject<string>();
  }

  ngOnInit() {
    this.subscriptionSubject = this.subject.subscribe({
      next: (search) => {
        this.searchValue = search;
      }
    });
    this.subscriptionRoute = this.activatedRoute.queryParams.subscribe((params) => {
      this.subject.next(params['search']);
      this.sendRequest();
    });

  }

  ngOnDestroy() {
    this.subscriptionSubject?.unsubscribe();
    this.subscriptionRoute?.unsubscribe();
    this.subscriptionRequest?.unsubscribe()
  }

  sendRequest() {
    this.loading = true;
    this.mainTitle = (this.searchValue) ? ('Результаты поиска по запросу ' + this.searchValue) : 'Наши чайные коллекции';

    this.subscriptionRequest = this.productService.getCatalogTea(this.searchValue)
      .pipe(
        tap(() => {
          this.loading = false;
          this.searchResult = false;
        })
      )
      .subscribe(
        {
          next: (data) => {
            if (this.searchValue && data.length === 0) {
              this.searchResult = true;
            }
            this.catalogTea = Object.values(data);

          },
          error: (error) => {
            this.router.navigate(['/']);
          }
        }
      )
  }


}
