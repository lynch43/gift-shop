import { Component, inject } from '@angular/core';
import { CommonModule} from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonRow, IonIcon, IonCol, IonThumbnail, IonImg, IonCard, IonLabel, IonText, IonSearchbar, IonButtons, IonButton, IonBadge, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/angular/standalone';
import { ApiService } from '../services/api/api.service';
import { RouterLink } from '@angular/router';
import { CartService } from '../services/cart/cart.service';
import { Subscription } from 'rxjs';
import { Geolocation } from '@capacitor/geolocation';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [CommonModule, IonCardContent, IonCardTitle, IonCardHeader, IonBadge, IonButton, IonButtons, IonSearchbar, IonText, IonLabel, IonCard, IonImg, IonCol, IonIcon, IonRow, IonHeader, IonToolbar, IonTitle, IonContent, IonThumbnail, RouterLink],
})
export class HomePage {

  // Used to store current coordinates
  lat: string = '';
  long: string = '';

  /* Default set here is weird. But when you see it 
      says euro then you see the benefit */ 
  currency: string = 'GBP';

  /* items to display and all Items as master copy to filter / search from */
  items: any[] = [];
  allItems: any[] = [];

  /* Search inputs */
  query!: string;

  /* Will be set to 0 if deployed */
  totalItems = 1;

  /* Subscription used to track live update from the cart */
  cartSub!: Subscription;

  /* Global */
  private api = inject(ApiService);
  private cartService = inject(CartService);




  constructor() { }

  ngOnInit() {
    /** On load, get items + user location + currency setup */
    this.getItems();
    this.getGPSAndSetCurrency();

    /** Subscribes to cart changes and updates cart icon live */
    this.cartService.cart.subscribe({
      next: (cart) => {
        this.totalItems = cart.length;
      }
    });
  }

  /** Cleans up the cart subscription when page is destroyed */
  ngOnDestroy(): void {
    if (this.cartSub) this.cartSub.unsubscribe();
  }

  /** Load all items into items and allItems arrays */
  getItems() {

    this.api.getAllProducts().subscribe({
      next: (data) => {
        this.allItems = data;
        this.items = [...this.allItems];
      },
      error: (err) => console.error('Error getting the products', err)
    });

  }

  /** Triggered on search bar input */
  onSearchChange(event: any) {
    console.log(event.detail.value);
    this.query = event.detail.value.toLowerCase(); // Avoid case-sensitivity bugs
    this.querySearch(); // Do the filtering
  }

  /** Based on query, filter items or reset list */
  querySearch() {
    this.items = [];
    if (this.query.length > 0) {
      this.searchItems();
    } else {
      this.items = [...this.allItems]; // Show full list again
    }
  }

  /** Filter items from API by name containing query string */
  searchItems() {
    if (!this.query || this.query.trim() === '') {
      this.items = [...this.allItems]; // show all items when query is empty
    } else {
      const queryLower = this.query.toLowerCase();
      this.items = this.allItems.filter(item =>
        item.title.toLowerCase().includes(queryLower)
      );
    }
  }
  

  /** Get coordinates using Capacitor Geolocation */
  async getGPSAndSetCurrency() {
    try {
      const coords = await Geolocation.getCurrentPosition();
      this.lat = coords.coords.latitude.toString();
      this.long = coords.coords.longitude.toString();

      /** Use lat/lng to determine if user is in Eurozone */
      this.setCurrencyFromCoords(coords.coords.latitude, coords.coords.longitude);
    } catch (error) {
      console.error('Failed to get GPS location:', error);
    }
  }

  /** Basic check for European region to set currency */
  setCurrencyFromCoords(lat: number, lng: number) {
    const inEuroZone = (lat >= 35 && lat <= 60) && (lng >= -10 && lng <= 30);
    this.currency = inEuroZone ? 'EUR' : 'GBP';
    console.log(`Currency based on location: ${this.currency}`);
  }
}