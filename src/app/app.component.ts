import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { bagHandle, bagHandleOutline, star } from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor() {
    // i add some custom icons so they can be used anywhere in the app
    addIcons({
      star,
      bagHandleOutline,
      bagHandle
    })
  }
}
