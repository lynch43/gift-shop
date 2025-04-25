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

  cartItems: any[] = []; // holds items to display

  constructor(private cartService: CartService) {}

  ngOnInit() {
    // Subscribe to the cart observable to get updates
    this.cartService.cart.subscribe((items) => {
      this.cartItems = items;
    });
  }

  /**
   * Clears all items from the cart.
   */
  clearCart() {
    this.cartService.clearCart();
  }
}
