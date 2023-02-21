import {Component,} from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  searchField = new FormControl('');

  constructor() {

  }
  resetSearch(){
    this.searchField.setValue('');
  }
}
