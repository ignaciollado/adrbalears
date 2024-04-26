import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { genericDataDTO } from '../model/generic-data.model';
import { ArticleDTO } from '../model/article-data.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private url = 'http://jsonplaceholder.typicode.com/posts';
  /* key para JOOMLA 4 */
  private jToken = 'c2hhMjU2OjkwNzpjZjRkMmYwOTkxMGYyZTFiMWY2NGFjYThjZWVjM2VlNmI4ZGRlNGU1OTBjNzNiODA0NzM2NDdhYjUwN2M4NTdm'
  private apiBaseUrlOne = 'https://contents.idi.es/api/index.php/v1/content/articles'
  private apiBaseUrl = 'https://contents.idi.es/api/index.php/v1/content/articles?page[offset]=0&page[limit]=200' /* Chapuza para mostrar todo ya que no veo como pasar query parameters */
  private apiBaseUrlEverything = 'https://contents.idi.es/api/index.php/v1/content/articles?page[offset]=0&page[limit]=1800' /* Chapuza para mostrar todo ya que no veo como pasar query parameters */
  private apiBaseUrlLastContent = 'https://contents.idi.es/api/index.php/v1/content/articles?page[offset]=0&page[limit]=20' /* Offset 0 y tamaño de página a 20 artículos */
  /* ---------------------------------------- */

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<genericDataDTO[]> {
    return this.httpClient.get<genericDataDTO[]>(this.url);
  }

  get(id: string): Observable<genericDataDTO> {
    return this.httpClient.get<genericDataDTO>(`${this.url}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.httpClient.post(this.url, data);
  }

  update(id: string, data: any): Observable<any> {
    return this.httpClient.put(`${this.url}/${id}`, data);
  }

  delete(id: string): Observable<any> {
    return this.httpClient.delete(`${this.url}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.httpClient.delete(this.url);
  }

  findByTitle(title: string): Observable<genericDataDTO[]> {
    return this.httpClient.get<genericDataDTO[]>(`${this.url}?title=${title}`);
  }

}
