import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonText, IonButton, IonButtons, IonFooter, IonBackButton } from '@ionic/angular/standalone';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
  standalone: true,
  imports: [IonBackButton, IonFooter, 
    IonButton, IonContent, IonHeader, IonTitle, IonToolbar,
    IonList, IonItem, IonLabel, IonText, CommonModule, FormsModule, IonButtons,
  ]
})
export class CartPage implements OnInit {

  cartItems: any[] = [] // holds the items to show in the cart page

  constructor(private cartService: CartService) {}

  ngOnInit() {
    // I subscribe to the cart so this page stays updated when things are added or cleared
    this.cartService.cart.subscribe((items) => {
      this.cartItems = items
    })
  }

  /**
   * clears all items from the cart by calling my cartService
   */
  clearCart() {
    this.cartService.clearCart()
  }
}
