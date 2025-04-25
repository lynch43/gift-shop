# Gift Shop - Front End Web App ( Built for Front End Web Development in Atlantic Technical University )

## About

this is a frontend app built using **Angular** and **Ionic**  
it connects to the [FakeStoreAPI](https://fakestoreapi.com/products) and is set up to run as a PWA on browser and mobile  
the app uses a live cart system, location-based currency, and a dark theme for better user experience

---

## Features

- cart system built using `BehaviorSubject` from **RxJS**
- cart persistence with browser `localStorage`
- external data fetching with `HttpClient` from **@angular/common/http**
- gps location pulled with `@capacitor/geolocation`
- automatic currency set to EUR or GBP depending on coordinates
- standalone ionic components setup for faster loading and cleaner routing
- fully dark-themed layout built using Ionic SCSS variables

---

## Technical Documentation

the project uses:

- **Standalone Components** instead of the older Angular Module system  
  referenced [Ionic Standalone Migration Docs](https://ionicframework.com/docs/angular/standalone-components) to structure the pages properly

- **localStorage** directly instead of `@ionic/storage-angular`  
  after testing, i decided to write my own `LocalStorageService` because ionic storage gave issues when testing with `ionic serve`  
  cross referenced solutions on [Stack Overflow - Ionic Storage Issue](https://stackoverflow.com/questions/74439365/no-available-storage-method-found-in-ionic-angular)  

- **HttpClient and Observables** for API requests  
  built an `ApiService` that uses `HttpClient.get()` to pull all products from FakeStoreAPI  
  followed examples from [Angular Docs - HTTP Requests](https://angular.io/guide/http)

- **BehaviorSubject** to manage cart items across the app  
  cart items are pushed into a `BehaviorSubject` inside `CartService`  
  components like Home and Cart pages subscribe to this to show live updates without manual refresh

- **Capacitor Geolocation Plugin**  
  pulled user gps data using `@capacitor/geolocation`  
  based the currency switch logic on coordinates (eurozone or not)  
  used [Capacitor Geolocation Docs](https://capacitorjs.com/docs/apis/geolocation) as a guide and the documentation of the Module 'Front End Web Development' used in college



- **Error Handling**  
  added try-catch blocks for gps failures  
  handled possible undefined api responses when loading products

---

## Wireframes

**Home Page**

> (./assets/wireframes/home-wireframe.png)

**Item Detail Page**

> (./assets/wireframes/item-detail-wireframe.png)

**Cart Page**

> (./assets/wireframes/cart-wireframe.png)

---


