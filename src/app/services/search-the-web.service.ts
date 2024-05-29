import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ArticleDTO } from '../Models/article-data.dto';
/* import { MessageService } from './message.service'; */

@Injectable({
  providedIn: 'root'
})
export class SearchTheWebService {

  private jToken = 'c2hhMjU2OjkwNzpjZjRkMmYwOTkxMGYyZTFiMWY2NGFjYThjZWVjM2VlNmI4ZGRlNGU1OTBjNzNiODA0NzM2NDdhYjUwN2M4NTdm'
  private apiBaseUrlOne = 'https://contents.idi.es/api/index.php/v1/content/articles'
  private apiBaseUrl = 'https://contents.idi.es/api/index.php/v1/content/articles?page[offset]=0&page[limit]=1700' /* Chapuza para mostrar todo ya que no veo como pasar query parameters */

  headers = new HttpHeaders()
    .set( 'Content-Type', 'application/vnd.api+json' ) 
    .set(  'X-Joomla-Token', this.jToken  )
 
  constructor( private http: HttpClient /* , private messagesService: MessageService */ ) { }

  getArticles() {

    /* this.messagesService.add('ArticleService: fetched ALL articles') */
    return this.http.get<ArticleDTO>( this.apiBaseUrl, { headers: this.headers } )

  }
  
}
