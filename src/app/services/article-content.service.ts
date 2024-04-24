import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ArticleDTO } from '../model/article-data.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ArticleContentService {
  private url = 'http://jsonplaceholder.typicode.com/posts';
  /* key para JOOMLA 4 */
  private jToken = 'c2hhMjU2OjkwNzpjZjRkMmYwOTkxMGYyZTFiMWY2NGFjYThjZWVjM2VlNmI4ZGRlNGU1OTBjNzNiODA0NzM2NDdhYjUwN2M4NTdm'
  private apiBaseUrlOne = 'https://contents.idi.es/api/index.php/v1/content/articles'
  private apiBaseUrl = 'https://contents.idi.es/api/index.php/v1/content/articles?page[offset]=0&page[limit]=200' /* Chapuza para mostrar todo ya que no veo como pasar query parameters */
  private apiBaseUrlEverything = 'https://contents.idi.es/api/index.php/v1/content/articles?page[offset]=0&page[limit]=1800' /* Chapuza para mostrar todo ya que no veo como pasar query parameters */
  private apiBaseUrlLastContent = 'https://contents.idi.es/api/index.php/v1/content/articles?page[offset]=0&page[limit]=20' /* Offset 0 y tamaño de página a 20 artículos */
  /* ---------------------------------------- */

  headers = new HttpHeaders()
  .set( 'Content-Type', 'application/vnd.api+json' ) 
  .set( 'X-Joomla-Token', this.jToken )

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<ArticleDTO[]> {
    return this.httpClient.get<ArticleDTO[]>(this.apiBaseUrl, { headers: this.headers });
  }

  get(id: string): Observable<ArticleDTO> {
    return this.httpClient.get<ArticleDTO>(`${this.apiBaseUrl}/${id}`, { headers: this.headers });
  }

  create(data: any): Observable<any> {
    return this.httpClient.post(this.apiBaseUrl, data, { headers: this.headers });
  }

  update(id: string, data: any): Observable<any> {
    return this.httpClient.put(`${this.apiBaseUrl}/${id}`, data, { headers: this.headers });
  }

  delete(id: string): Observable<any> {
    return this.httpClient.delete(`${this.apiBaseUrl}/${id}`, { headers: this.headers });
  }

  deleteAll(): Observable<any> {
    return this.httpClient.delete(this.apiBaseUrl, { headers: this.headers });
  }

  findByTitle(title: string): Observable<ArticleDTO[]> {
    return this.httpClient.get<ArticleDTO[]>(`${this.apiBaseUrl}?title=${title}`, { headers: this.headers });
  }

}
