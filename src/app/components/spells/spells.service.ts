import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ISpellsResponse, ISpellsSingleResponse } from './spells.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpellsService {

  resourceUrl = 'https://api.potterdb.com/v1';

  constructor(private http: HttpClient) {}

  getAllSpells(page: number, size: number): Observable<HttpResponse<ISpellsResponse>> {
    return this.http.get<ISpellsResponse>(`${this.resourceUrl}/spells?page[number]=${page}&page[size]=${size}`, {observe: 'response'});
  }
  
  getSpell(slug: String): Observable<HttpResponse<ISpellsSingleResponse>> {
    return this.http.get<ISpellsSingleResponse>(`${this.resourceUrl}/spells/${slug}`, {observe: 'response'});
  }

  getSpellByName(name: string): Observable<HttpResponse<ISpellsResponse>> {
    return this.http.get<ISpellsResponse>(`${this.resourceUrl}/spells/?filter[name_cont]=${name}`, {observe: 'response'});
  }

}