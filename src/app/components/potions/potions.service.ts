import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPotionsResponse } from './potions.model';

@Injectable({
  providedIn: 'root'
})
export class PotionsService {

  resourceUrl = 'https://api.potterdb.com/v1';

  constructor(private http: HttpClient) {}

  getAllPotions(page: number, size: number): Observable<HttpResponse<IPotionsResponse>> {
    return this.http.get<IPotionsResponse>(`${this.resourceUrl}/potions?page[number]=${page}&page[size]=${size}`, {observe: 'response'});
  }
  
}