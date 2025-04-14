import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    /*
    * When user goes to /home, angular will scan this children array and will try and figure out what to load next
    *
    */
    path: 'home',
    children: [
      {
        path: '', // empty because it is the root page
        loadComponent: () => import('./home/home.page').then((m) => m.HomePage)
      },
      {
        path: 'gifts/:id', // use this to path the ID
        loadComponent: () => import('./home/item-detail/item-detail.page').then(m => m.ItemDetailPage)
      }

    ]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },


];
