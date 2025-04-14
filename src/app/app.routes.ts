import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },  {
    path: 'item-detail',
    loadComponent: () => import('./home/item-detail/item-detail.page').then( m => m.ItemDetailPage)
  },

];
