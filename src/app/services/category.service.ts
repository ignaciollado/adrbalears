import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from './message.service';
import { Category } from '../model/category.model';
import { OneCategory } from '../model/oneCategory.model';

@Injectable({
  providedIn: 'root'
})

export class CategoryService {

  private jToken = 'c2hhMjU2OjkwNzpjZjRkMmYwOTkxMGYyZTFiMWY2NGFjYThjZWVjM2VlNmI4ZGRlNGU1OTBjNzNiODA0NzM2NDdhYjUwN2M4NTdm'
  private apiBaseUrlOne = 'https://contents.idi.es/api/index.php/v1/content/categories'
  private apiBaseUrl = 'https://contents.idi.es/api/index.php/v1/content/categories?page[offset]=0&page[limit]=210' /* Chapuza para mostrar todo ya que no veo como pasar query parameters */

  headers = new HttpHeaders()
    .set( 'Content-Type', 'application/vnd.api+json' ) 
    .set(  'X-Joomla-Token', this.jToken  )
 
  constructor( private http: HttpClient, private messagesService: MessageService ) { }

  getCategories() {
    this.messagesService.add('CategoryService: fetched ALL categories')
    return this.http.get<Category>( this.apiBaseUrl, { headers: this.headers } )
  }

  getCategory(id: string) {
    this.messagesService.add('CategoryService: fetched a category')
    return this.http.get<OneCategory>( `${this.apiBaseUrlOne}/${id}`, { headers: this.headers } )
  }
}