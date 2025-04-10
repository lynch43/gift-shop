import { Component, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { ApiService } from '../services/api/api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomePage {

  items: any[] = [];
  allItems: any[] = [];

  private api = inject(ApiService);

  constructor() {}

  getItems() {
   this.allItems = this.api.items;
   this.items = [...this.allItems];
  }
}
