import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from '../local-storage.service';

/**
 * CartService is where we handle everything related to the shopping cart
 * Instead of using Ionics async storage (which gave me issues)
 * I simplified it to use basic browser localStorage through a helper service
 */
@Injectable({
  providedIn: 'root'
})
export class CartService {
  private CART_KEY = 'myCartItems'; // Just a simple key for storing in localStorage

  // This holds the live cart data in memory
  private _cart = new BehaviorSubject<any[]>([]);

  // Other parts of the app can subscribe to this to get real-time cart updates
  cart = this._cart.asObservable();

  constructor(private localStorage: LocalStorageService) {
    this.loadCart(); // Load cart from localStorage when the service starts
  }

  /**
   * Crt items from localStorage to BehaviorSubject

   * So if someone added items last time they visited they will still be there
   */
  loadCart() {
    const items = this.localStorage.get(this.CART_KEY);
    this._cart.next(items || []);
  }

  /**
   * Adds an item to the cart:
   * - updates the in-memory cart
   * - saves the updated cart to localStorage
   */
  addToCart(item: any) {
    const cart = this._cart.value;
    cart.push(item);
    this._cart.next(cart);
    this.localStorage.set(this.CART_KEY, cart);
  }

  /**
   * Clears everything from the cart:
   * - wipes in-memory cart
   * - removes saved cart from localStorage
   */
  clearCart() {
    this._cart.next([]);
    this.localStorage.remove(this.CART_KEY);
  }

  /**
   * Returns the current number of items in the cart
   * 
   */
  getTotalItemCount(): number {
    return this._cart.value.length;
  }
}
