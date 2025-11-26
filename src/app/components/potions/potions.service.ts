import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPotionsResponse, IPotionsSingleResponse } from './potions.model';

@Injectable({
  providedIn: 'root'
})
export class PotionsService {

  resourceUrl = 'https://api.potterdb.com/v1';

  constructor(private http: HttpClient) {}

  getAllPotions(page: number, size: number): Observable<HttpResponse<IPotionsResponse>> {
    return this.http.get<IPotionsResponse>(`${this.resourceUrl}/potions?page[number]=${page}&page[size]=${size}`, {observe: 'response'});
  }

  getPotion(slug: String): Observable<HttpResponse<IPotionsSingleResponse>> {
    return this.http.get<IPotionsSingleResponse>(`${this.resourceUrl}/potions/${slug}`, {observe: 'response'});
  }

  getPotionByName(name: string): Observable<HttpResponse<IPotionsResponse>> {
    return this.http.get<IPotionsResponse>(`${this.resourceUrl}/potions/?filter[name_cont]=${name}`, {observe: 'response'});
  }
  
}