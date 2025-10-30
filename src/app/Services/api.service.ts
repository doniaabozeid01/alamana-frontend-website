import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  baseUrl: string = "https://localhost:7046/api/";


  constructor(private httpClient: HttpClient) { 

  }
  
  GetAllCategories(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}Categories/GetAllCategories`);

  }


}