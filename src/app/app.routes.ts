import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    /*
    when user goes to /home, angular looks through this children array to figure out what page to show
    */
    path: 'home',
    children: [
      {
        path: '', // root page for /home
        loadComponent: () => import('./home/home.page').then((m) => m.HomePage)
      },
      {
        path: 'cart', // cart page under home
        loadComponent: () => import('./home/cart/cart.page').then(m => m.CartPage)
      },
      {
        path: 'gifts/:id', // passing id to show item details
        children: [
          {
            path: '', // main item detail page
            loadComponent: () => import('./home/item-detail/item-detail.page').then((m) => m.ItemDetailPage)
          },
          {
            path: 'cart', // cart under gift detail
            loadComponent: () => import('./home/cart/cart.page').then(m => m.CartPage)
          }
        ],
      },
    ]
  },
  {
    path: '', // if no path, redirect to home
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'cart', // separate cart route outside of home path
    loadComponent: () => import('./home/cart/cart.page').then(m => m.CartPage)
  },
];
