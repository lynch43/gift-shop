import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from '../local-storage.service';

/**
 * CartService handles the logic for managing shopping cart items.
 * This version uses simple browser localStorage via LocalStorageService,
 * avoiding async setup and compatibility issues from Ionic Storage.
 */
@Injectable({
  providedIn: 'root'
})
export class CartService {
  private CART_KEY = 'myCartItems'; // Key used to store/retrieve cart data

  private _cart = new BehaviorSubject<any[]>([]);
  cart = this._cart.asObservable();

  constructor(private localStorage: LocalStorageService) {
    this.loadCart();
  }

  /**
   * Loads cart items from localStorage into the BehaviorSubject.
   * This makes saved cart items appear immediately on app start.
   */
  loadCart() {
    const items = this.localStorage.get(this.CART_KEY);
    this._cart.next(items || []);
  }

  /**
   * Adds a new item to the cart and saves it to localStorage.
   * @param item The item object to be added to the cart
   */
  addToCart(item: any) {
    const cart = this._cart.value;
    cart.push(item);
    this._cart.next(cart);
    this.localStorage.set(this.CART_KEY, cart);
  }

  /**
   * Clears the cart from memory and from localStorage.
   */
  clearCart() {
    this._cart.next([]);
    this.localStorage.remove(this.CART_KEY);
  }

  /**
   * Returns the number of items currently in the cart.
   * @returns total item count
   */
  getTotalItemCount(): number {
    return this._cart.value.length;
  }
}
