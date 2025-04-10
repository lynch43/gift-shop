import { Component, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonRow, IonIcon, IonCol, IonThumbnail, IonImg } from '@ionic/angular/standalone';
import { ApiService } from '../services/api/api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonImg, IonCol, IonIcon, IonRow, IonHeader, IonToolbar, IonTitle, IonContent, IonThumbnail],
})
export class HomePage {

  items: any[] = [];
  allItems: any[] = [];

  private api = inject(ApiService);

  constructor() { }

  ngOnInit() {
    console.log('ngoninit homepage is initializing and loading');
    this.getItems();
  }

  getItems() {
    this.allItems = this.api.items;
    this.items = [...this.allItems]; //Spread Operator wont make changes to allItems if items is affected
  }
}
