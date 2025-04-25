import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage-angular';

/**
 * CartService handles the logic for managing shopping cart items.
 * It uses Ionic Storage to save cart items persistently,
 * and a BehaviorSubject to update components in real-time.
 */
@Injectable({
  providedIn: 'root'
})
export class CartService {
  private CART_KEY = 'myCartItems'; // Key used to store/retrieve cart data
  private storageReady = false; // Used to check if storage is initialized

  // BehaviorSubject allows us to update the cart live across the app
  private _cart = new BehaviorSubject<any[]>([]);
  
  // This is what other components will subscribe to
  cart = this._cart.asObservable();

  /**
   * When the service is created, we run init()
   * to set up storage and load saved cart items.
   */
  constructor(private storage: Storage) {
    this.init();
  }

  /**
   * Initializes Ionic Storage and loads cart items (if any) from previous sessions.
   * Updates the cart BehaviorSubject with the loaded data.
   */
  async init() {
    const store = await this.storage.create(); // Set up Ionic Storage
    const items = await store.get(this.CART_KEY); // Get saved cart items
    this._cart.next(items || []); // Set the cart value, or use empty array
    this.storageReady = true; // Mark storage as ready
  }

  /**
   * Adds a new item to the cart and updates both:
   * - The in-memory cart (BehaviorSubject)
   * - The saved cart (Ionic Storage)
   * @param item The item object to be added to the cart
   */
  async addToCart(item: any) {
    const cart = this._cart.value; // Get current cart items
    cart.push(item); // Add the new item
    this._cart.next(cart); // Update observable value
    if (this.storageReady) {
      await this.storage.set(this.CART_KEY, cart); // Save to storage
    }
  }

  /**
   * Clears all items from the cart (both memory and storage).
   * Typically used for a "Clear Cart" button or after checkout.
   */
  async clearCart() {
    this._cart.next([]); // Empty the cart in memory
    if (this.storageReady) {
      await this.storage.remove(this.CART_KEY); // Remove saved cart from storage
    }
  }

  /**
   * Returns the total number of items in the cart.
   * This can be used for showing a cart badge or cart summary.
   * @returns Number of items currently in the cart
   */
  getTotalItemCount(): number {
    return this._cart.value.length;
  }
}