import { Component, OnInit } from '@angular/core';

import { IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton, IonButtons, IonIcon, IonItem, IonLabel, IonText, IonFooter, IonButton, IonBadge } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { inject } from '@angular/core';
import { NavController } from '@ionic/angular/standalone';
import { ApiService } from 'src/app/services/api/api.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.page.html',
  styleUrls: ['./item-detail.page.scss'],
  standalone: true,
  imports: [RouterLink, IonBadge, IonButton, IonFooter, IonText, IonLabel, IonItem, IonIcon, IonButtons, IonTitle, IonBackButton, IonButtons, IonToolbar, IonHeader, IonContent],
})
export class ItemDetailPage implements OnInit {

  private route = inject(ActivatedRoute);
  private navCtrl = inject(NavController);
  id!: string;
  item: any;
  addToBag!: any;
  totalItems = 0;
  private api = inject(ApiService);
  private cartService = inject(CartService);

  ngOnInit() {
    this.getItem(); 

    this.cartService.cart.subscribe((items) => {
      this.totalItems = items.length;
    });

  }

  // get item from the route's parameter
  // snapshot will get current route
  // paramMap can grab the dynamic part which is 'id
  getItem() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('check the id: ', id);


    // check if id is not there or = 0 
    if (!id || id == '0') {
      this.navCtrl.back(); // go back if so
      return;
    }
    this.id = id;


    // Avvessing the api service instead of json data
    this.api.getProductById(id).subscribe({
      next: (product) => {
        this.item = product;
        console.log('Fetched item:', this.item);
      },
      error: (err) => {
        console.error('error getting item ', err);
        this.navCtrl.back(); // if error just navigate back
      }
    });

  }

  async addItem() {
    await this.cartService.addToCart(this.item);
    this.addedText();
  }

  addedText() {
    this.addToBag = 'Added to Bag';
    setTimeout(() => {
      this.addToBag = null;
    }, 2000);
  }

}
