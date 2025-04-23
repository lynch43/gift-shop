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
    const data = this._cart.value; // used to hold value in the cart
    const totalItem = (data?.totalItem || 0) + 1;
    this._cart.next({ totalItem });
  }

}
