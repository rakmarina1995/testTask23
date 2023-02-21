import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";

declare var $: any;

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

export class MainComponent implements OnInit, OnDestroy {
  public popupShow: boolean = false;
  private popup: Observable<boolean>;
  private subscription: Subscription | null = null;

  constructor() {
    $(function () {
      $("#accordion").accordion({
        collapsible: true,
        heightStyle: "content",
        icons: {"header": " icon", "activeHeader": "icon_act"}
      });
    });
    this.popup = new Observable((observer) => {
      const timeout = setTimeout(() => {
        this.popupShow = true;
        observer.next(this.popupShow);
      }, 10000);
      return {
        unsubscribe() {
          clearTimeout(timeout);
        }
      }
    })
  }

  ngOnInit() {
    this.subscription = this.popup.subscribe((param) => {

    })
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
  hidePopup(){
    this.popupShow=false;
  }
}
