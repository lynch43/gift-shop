import { Component, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonRow, IonIcon, IonCol, IonThumbnail, IonImg, IonCard, IonLabel, IonText, IonSearchbar } from '@ionic/angular/standalone';
import { ApiService } from '../services/api/api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonSearchbar, IonText, IonLabel, IonCard, IonImg, IonCol, IonIcon, IonRow, IonHeader, IonToolbar, IonTitle, IonContent, IonThumbnail],
})
export class HomePage {

  items: any[] = [];
  allItems: any[] = [];
  query!: string; //query is Expected to be astring. 

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
}
