import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApigroupService {
  host = 'http://localhost:8000/api/'
  constructor(private http:HttpClient) { }

  getGroups(){
    let endpoint = 'vehicles';
    let url = this.host + endpoint;
    return this.http.get<any>(url);
  }
}
