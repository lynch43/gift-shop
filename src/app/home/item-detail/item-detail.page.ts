import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton, IonButtons } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { inject } from '@angular/core';
import { NavController } from '@ionic/angular/standalone';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.page.html',
  styleUrls: ['./item-detail.page.scss'],
  standalone: true,
  imports: [IonButtons, IonTitle, IonBackButton, IonButtons, IonToolbar, IonHeader, IonContent],
})
export class ItemDetailPage implements OnInit {

  private route = inject(ActivatedRoute);
  private navCtrl = inject(NavController);
  id!: string;
  item: any;
  private api = inject(ApiService);

  ngOnInit() {
    this.getItem(); // fetch the item details

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

    // Search for the item in the items array using the id that we know is for sure valid.
    //use find method to locate the item and match it to id and equal it to the id.

    this.item = this.api.items.find((record) => record.id == id);
    console.log(this.item); // test just check log
  }

}
