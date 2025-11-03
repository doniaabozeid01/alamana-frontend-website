import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl: string = "https://localhost:7046/api/";


  constructor(private httpClient: HttpClient) {

  }

  register(userData: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}Account/userRegister`, userData);

  }

  login(userData: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}Account/login`, userData);
  }



  getUserId(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}Account/getUserId`);
  }



}
