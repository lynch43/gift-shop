# Gift Shop - Front End Web App (Built for Front End Web Development in Atlantic Technical University)

## About

This is a frontend app built using **Angular** and **Ionic**.  
It connects to the [FakeStoreAPI](https://fakestoreapi.com/products) they have a pretty good docs [here](https://fakestoreapi.com/docs )and is set up to run as a PWA on browser and mobile.  I watched videos on youtube of this guy []
The app uses a live cart system, location-based currency, and a dark theme for better user experience.

---

## Features

- Cart system built using `BehaviorSubject` from **RxJS**
- Cart persistence with browser `localStorage`
- External data fetching with `HttpClient` from **@angular/common/http**
- GPS location pulled with `@capacitor/geolocation`
- Automatic currency set to EUR or GBP depending on coordinates
- Standalone Ionic components setup for faster loading and cleaner routing
- Fully dark-themed layout built using Ionic SCSS variables

---

## Technical Documentation

The project uses:

- **Standalone Components** instead of the older Angular Module system  
  Referenced [Ionic Standalone Migration Docs](https://ionicframework.com/docs/angular/build-options#standalones) to structure the pages properly.

- **localStorage** directly instead of `@ionic/storage-angular`  
  After testing, I decided to write my own `LocalStorageService` because Ionic storage gave issues when testing with `ionic serve`.  
  Cross-referenced solutions on [Stack Overflow - Ionic Storage Issue](https://stackoverflow.com/questions/74439365/no-available-storage-method-found-in-ionic-angular).

- **HttpClient and Observables** for API requests  
  Built an `ApiService` that uses `HttpClient.get()` to pull all products from FakeStoreAPI.  
  Followed examples from [Angular Docs - HTTP Requests](https://angular.io/guide/http).

- **BehaviorSubject** to manage cart items across the app  
  Cart items are pushed into a `BehaviorSubject` inside `CartService`.  
  Components like Home and Cart pages subscribe to this to show live updates without manual refresh.

- **Capacitor Geolocation Plugin**  
  Pulled user GPS data using `@capacitor/geolocation`. 

  Based the currency switch logic on coordinates (eurozone or not). 
  I checked it to make sure it is somewhat accurate. ![screenshots](src\assets\geolocation-test.png) 
  Used [Capacitor Geolocation Docs](https://capacitorjs.com/docs/apis/geolocation) as a guide and the documentation of the module 'Front End Web Development' used in college.

- **Error Handling**  
  Added try-catch blocks for GPS failures.  
  Handled possible undefined API responses when loading products.

---

## Wireframes

**Home Page**

![Home Page Wireframe](src\assets\wireframes\home-wireframe.png)

**Item Detail Page**

![Item Detail Page Wireframe](src\assets\wireframes\item-detail-wireframe.png)

**Cart Page**

![Cart Page Wireframe](src\assets\wireframes\cart-screen-wireframe.png)

