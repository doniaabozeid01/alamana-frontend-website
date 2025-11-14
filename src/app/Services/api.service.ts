import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  baseUrl: string = "https://localhost:7046/api/";


  constructor(private httpClient: HttpClient) { }

  GetAllCategories(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}Categories/GetAllCategories`);
  }



  GetCategoryWithProductsById(id: number): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}Categories/GetCategoryWithProductsById/${id}`);
  }


  GetAllProducts(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}Product/GetAllProducts`);

  }



  GetProductById(id: number): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}Product/GetProductById/${id}`);

  }



  CreateOrder(data: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}Orders/CreateOrder`, data);
  }



  GetAllPaymentMethods(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}PaymentMethods/GetAllPaymentMethods`);
  }

  GetAllCountries(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}Location/GetAllCountries`);
  }


  GetGovernoratesByCountryId(CountryId: number): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}Location/GetGovernoratesByCountryId/${CountryId}`);
  }


  GetCitiesByGovernorateId(GovernorateId: number): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}Location/GetCitiesByGovernorateId/${GovernorateId}`);
  }
  GetDistrictsByCityId(cityId: number): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}Location/GetDistrictsByCityId/${cityId}`);
  }


  GetCartByUserId(userId: string): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}Cart/GetCartByUserId/${userId}`);
  }


  // GetOrCreateCart(userId: string): Observable<any> {
  //   return this.httpClient.get(`${this.baseUrl}Cart/GetOrCreateCart/${userId}`);
  // }




  GetOrdersByUserId(userId: string): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}Orders/GetOrdersByUserId/${userId}`);
  }


  // AddCartItem(data: any): Observable<any> {
  //   return this.httpClient.post(`${this.baseUrl}CartItems/CartItems/AddCartItem`, data);
  // }


  GetAllAdvertisements(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}Advertisements/GetAllAdvertisements`);
  }




  GetNewProducts(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}Product/GetNewProducts`);
  }



  addToCart(data: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}CartItems/AddCartItem`, data);
  }


  DeleteCartItem(id: number): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}CartItems/DeleteCartItem/${id}`);
  }


  GetRandomProducts(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}Product/GetRandomProducts`);
  }


  bestSellers(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}Product/best-sellers`);
  }


  contactUs(data: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}ContactUs`, data);
  }


}