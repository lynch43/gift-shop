import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
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

  lat: string = '' // stores the current latitude
  long: string = '' // stores the current longitude

  currency: string = 'GBP'; // set default currency to GBP cause it made sense starting off

  items: any[] = [] // list of items to display
  allItems: any[] = [] // full copy of all items to search from

  query!: string // search input

  totalItems = 1 // how many items showing on cart badge

  cartSub!: Subscription // will be used for live tracking cart updates

  private api = inject(ApiService)
  private cartService = inject(CartService)

  constructor() { }

  ngOnInit() {
    // when page loads i get all the items and set user location and currency
    this.getItems()
    this.getGPSAndSetCurrency()

    // subscribe to cart to update cart icon live
    this.cartService.cart.subscribe({
      next: (cart) => {
        this.totalItems = cart.length
      }
    })
  }

  // clean up cart subscription when page is destroyed
  ngOnDestroy(): void {
    if (this.cartSub) this.cartSub.unsubscribe()
  }

  // fetch all products from api and store them
  getItems() {
    this.api.getAllProducts().subscribe({
      next: (data) => {
        this.allItems = data
        this.items = [...this.allItems]
      },
      error: (err) => console.error('Error getting the products', err)
    })
  }

  // triggered when i type into search bar
  onSearchChange(event: any) {
    console.log(event.detail.value)
    this.query = event.detail.value.toLowerCase() // lowercase so search is not case sensitive
    this.querySearch()
  }

  // based on what i type either filter items or reset to full list
  querySearch() {
    this.items = []
    if (this.query.length > 0) {
      this.searchItems()
    } else {
      this.items = [...this.allItems]
    }
  }

  // filter items where the title includes my search text
  searchItems() {
    if (!this.query || this.query.trim() === '') {
      this.items = [...this.allItems]
    } else {
      const queryLower = this.query.toLowerCase()
      this.items = this.allItems.filter(item =>
        item.title.toLowerCase().includes(queryLower)
      )
    }
  }

  // get gps coords and set currency based on where user is
  async getGPSAndSetCurrency() {
    try {
      const coords = await Geolocation.getCurrentPosition()
      this.lat = coords.coords.latitude.toString()
      this.long = coords.coords.longitude.toString()

      // after getting location set currency
      this.setCurrencyFromCoords(coords.coords.latitude, coords.coords.longitude)
    } catch (error) {
      console.error('Failed to get GPS location:', error)
    }
  }

  // basic check to see if user is in eurozone and set currency
  setCurrencyFromCoords(lat: number, lng: number) {
    // This doesn't work exactly. It is explained near the end of README.md
    const inEuroZone = (lat >= 35 && lat <= 60) && (lng >= -10 && lng <= 30)
    this.currency = inEuroZone ? 'EUR' : 'GBP'
    console.log(`Currency based on location: ${this.currency}`)
  }
}
