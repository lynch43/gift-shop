import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonText } from '@ionic/angular/standalone';
import { CartService } from '../../services/cart/cart.service'; // Double back
@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonList,
    IonItem,
    IonLabel,
    IonText,
    CommonModule,
    FormsModule
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

}
