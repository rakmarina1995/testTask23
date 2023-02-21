import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TeaType} from "../../../types/tea.type";

@Injectable({
  providedIn: 'root'
})
export class ProductService implements OnInit{

  constructor(private http:HttpClient) {
  }
  ngOnInit() {
  }
  getCatalogTea(search?:string){
    return this.http.get<TeaType[]>('https://testologia.site/tea'+(search ? `?search=${search}` : ''));
  }
  getTeaItem(id:string){
    return this.http.get<TeaType>('https://testologia.site/tea?id='+id);
  }


}
