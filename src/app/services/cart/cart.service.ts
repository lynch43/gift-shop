import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from '../local-storage.service';

/**
 * handles everything to do with the shopping cart
 * I moved from ionic storage to localStorage cause it was simpler and caused less problems
 */
@Injectable({
  providedIn: 'root'
})
export class CartService {
  private CART_KEY = 'myCartItems' // key I use to save the cart to storage

  private _cart = new BehaviorSubject<any[]>([]) // holds the live cart in memory

  cart = this._cart.asObservable() // lets other parts of the app subscribe to the cart

  constructor(private localStorage: LocalStorageService) {
    this.loadCart() // load the cart from localStorage when service starts
  }

  /**
   * gets the cart from storage and puts it into memory
   * if nothing is saved starts with an empty array
   */
  loadCart() {
    const items = this.localStorage.get(this.CART_KEY)
    this._cart.next(items || [])
  }

  /**
   * adds an item to the cart in memory and updates storage
   */
  addToCart(item: any) {
    const cart = this._cart.value
    cart.push(item)
    this._cart.next(cart)
    this.localStorage.set(this.CART_KEY, cart)
  }

  /**
   * clears the cart from memory and from storage
   */
  clearCart() {
    this._cart.next([])
    this.localStorage.remove(this.CART_KEY)
  }

  /**
   * gets the total number of items in the cart
   */
  getTotalItemCount(): number {
    return this._cart.value.length
  }
}
