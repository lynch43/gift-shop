import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  /* using FakeStoreAPI for products
     docs: https://fakestoreapi.com/docs#tag/Products/operation/getAllProducts 
  */
  private baseUrl = 'https://fakestoreapi.com/products'

  constructor(private http: HttpClient) {}

  // gets all products from the api
  getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl)
  }

  // gets a single product from the api by id
  getProductById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`)
  }
}
