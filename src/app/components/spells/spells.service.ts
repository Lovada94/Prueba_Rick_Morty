import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ISpellsResponse } from './spells.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpellsService {

  resourceUrl = 'https://api.potterdb.com/v1';

  constructor(private http: HttpClient) {}

  getAllCharacters(page: number): Observable<HttpResponse<ISpellsResponse>> {
    return this.http.get<ISpellsResponse>(`${this.resourceUrl}/spells?page[number]=${page}&page[size]=10`, {observe: 'response'});
  }
  
}