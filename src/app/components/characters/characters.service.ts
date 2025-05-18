import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICharatcerResponse } from './characters.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  resourceUrl = 'https://api.potterdb.com/v1';

  constructor(private http: HttpClient) {}

  getAllCharacters(page: number): Observable<HttpResponse<ICharatcerResponse>> {
    return this.http.get<ICharatcerResponse>(`${this.resourceUrl}/characters?page[number]=${page}&page[size]=10`, {observe: 'response'});
  }
  
}
