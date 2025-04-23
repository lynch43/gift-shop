import { Component, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonRow, IonIcon, IonCol, IonThumbnail, IonImg, IonCard, IonLabel, IonText, IonSearchbar, IonButtons, IonButton, IonBadge } from '@ionic/angular/standalone';
import { ApiService } from '../services/api/api.service';
import { RouterLink } from '@angular/router';
import { CartService } from '../services/cart/cart.service';
import { Subscription } from 'rxjs';
import { Geolocation } from '@capacitor/geolocation';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonBadge, IonButton, IonButtons, IonSearchbar, IonText, IonLabel, IonCard, IonImg, IonCol, IonIcon, IonRow, IonHeader, IonToolbar, IonTitle, IonContent, IonThumbnail, RouterLink],
})
export class HomePage {

  let: string = '';
  long: string = '';
  currency: 'GBP' | 'EUR' = 'GBP'; // default

  items: any[] = [];
  allItems: any[] = [];
  query!: string; //query is Expected to be astring. NOT NULL
  totalItems = 1;
  cartSub!: Subscription; // Tracking live subscription to cart changes.
  private api = inject(ApiService);
  private cartService = inject(CartService);




  constructor() { }

  ngOnInit() {
    console.log('ngoninit homepage is initializing and loading');
    this.getItems();

    this.cartSub = this.cartService.cart.subscribe({
      next: (cart) => {
        this.totalItems = cart ? cart?.totalItem : 0;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.cartSub) this.cartSub.unsubscribe();
  }

  getItems() {
    this.allItems = this.api.items;
    this.items = [...this.allItems]; //Spread Operator wont make changes to allItems if items is affected
  }

  onSearchChange(event: any) {
    console.log(event.detail.value);

    this.query = event.detail.value.toLowerCase();
    // convert the query that is searched all Lower to stop buigs
    this.querySearch();
  }

  querySearch() {
    this.items = [];
    if (this.query.length > 0) {
      this.searchItems();
    }
    else {
      this.items = [...this.allItems];
    }
  }

  //This method filters the list  of items bases on the search query
  searchItems() {
    // If the query is empty or null, display all items
    if (!this.query) {
      this.items = this.api.items; // Show all items if no search query is provided
    } else {
      // Filter the items to only include those whose name matches the search query (case-insensitive)
      this.items = this.api.items.filter(item =>
        item.name.toLowerCase().includes(this.query.toLowerCase())
      );
    }
  }

  // GPS logic
  async getGPSAndSetCurrency() {
    try {

      const coords = await Geolocation.getCurrentPosition();
      this.lat = coords.corrds.lattitude.toString();
      this.setCurrencyFromCoords(coords.coords.latitude, coords.coords.longitude);

    } catch (error) {
      console.error('Failed to get GPS:', error);
    }
  }
}
