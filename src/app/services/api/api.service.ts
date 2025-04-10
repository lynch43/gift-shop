import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  items: any[] = [
    { id: 1, name: 'Product 1', price: 25.99, status: true, rating: 4, cover: 'assets/product.jpg', description: 'This is a description for Product 1' },
    { id: 2, name: 'Product 2', price: 19.99, status: true, rating: 3, cover: 'assets/product.jpg', description: 'This is a description for Product 2' },
    { id: 3, name: 'Product 3', price: 35.99, status: false, rating: 5, cover: 'assets/product.jpg', description: 'This is a description for Product 3' },
    { id: 4, name: 'Product 4', price: 50.99, status: true, rating: 2, cover: 'assets/product.jpg', description: 'This is a description for Product 4' },
    { id: 5, name: 'Product 5', price: 75.99, status: true, rating: 4, cover: 'assets/product.jpg', description: 'This is a description for Product 5' },
    { id: 6, name: 'Product 6', price: 29.99, status: false, rating: 3, cover: 'assets/product.jpg', description: 'This is a description for Product 6' },
    { id: 7, name: 'Product 7', price: 49.99, status: true, rating: 4, cover: 'assets/product.jpg', description: 'This is a description for Product 7' },
    { id: 8, name: 'Product 8', price: 18.99, status: true, rating: 2, cover: 'assets/product.jpg', description: 'This is a description for Product 8' },
    { id: 9, name: 'Product 9', price: 55.99, status: true, rating: 5, cover: 'assets/product.jpg', description: 'This is a description for Product 9' },
    { id: 10, name: 'Product 10', price: 88.99, status: false, rating: 4, cover: 'assets/product.jpg', description: 'This is a description for Product 10' },
    { id: 11, name: 'Product 11', price: 65.99, status: true, rating: 3, cover: 'assets/product.jpg', description: 'This is a description for Product 11' },
    { id: 12, name: 'Product 12', price: 22.99, status: true, rating: 2, cover: 'assets/product.jpg', description: 'This is a description for Product 12' },
    { id: 13, name: 'Product 13', price: 39.99, status: false, rating: 4, cover: 'assets/product.jpg', description: 'This is a description for Product 13' },
    { id: 14, name: 'Product 14', price: 77.99, status: true, rating: 5, cover: 'assets/product.jpg', description: 'This is a description for Product 14' },
    { id: 15, name: 'Product 15', price: 99.99, status: true, rating: 5, cover: 'assets/product.jpg', description: 'This is a description for Product 15' }
  ];

}
