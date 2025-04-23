import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  private _cart = new BehaviorSubject<any>(null);

  get cart() {
    return this._cart.asObservable();
  }

  addQuantity(item: any) {

  }

}
