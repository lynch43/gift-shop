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
        path: 'cart',
        loadComponent: () => import('./home/cart/cart.page').then(m => m.CartPage)
      },
      {
        path: 'gifts/:id', // use this to path the ID
        children: [
          {
            path: '',
            loadComponent: () => import('./home/item-detail/item-detail.page').then((m) => m.ItemDetailPage)
          },

          {
            path: 'cart',
            loadComponent: () => import('./home/cart/cart.page').then(m => m.CartPage)
          }

        ],
        
      },
      


    ]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'cart',
    loadComponent: () => import('./home/cart/cart.page').then( m => m.CartPage)
  },



];
