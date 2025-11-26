import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICharacterFilter, ICharacterSingleResponse, ICharatcerResponse } from './characters.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  resourceUrl = 'https://api.potterdb.com/v1';

  constructor(private http: HttpClient) {}

  getAllCharacters(options?: ICharacterFilter): Observable<HttpResponse<ICharatcerResponse>> {
    const params = this.convertOptionsIntoParams(options);
    return this.http.get<ICharatcerResponse>(this.resourceUrl + '/characters' , {params: params, observe: 'response'});
  }

  getCharacter(slug: String): Observable<HttpResponse<ICharacterSingleResponse>> {
    return this.http.get<ICharacterSingleResponse>(`${this.resourceUrl}/characters/${slug}`, {observe: 'response'});
  }

  
  
  private convertOptionsIntoParams(options?: ICharacterFilter): any {
    let result: any = {};

    if(options) {
      if (options.page) {
        result['page[number]'] = options.page;
      }

      if (options.rows) {
        result['page[size]'] = options.rows;
      }

      if (options.name) {
        result['filter[name_cont]'] = options.name;
      }

      if (options.house) {
        result['filter[house_eq]'] = options.house;
      }

      if (options.gender) {
        result['filter[gender_eq]'] = options.gender;
      }
    }
    return result;
  }
}
