import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from './message.service';
import { WpCategory } from '../Models/wp-category-data.dto';

@Injectable({
  providedIn: 'root'
})

export class WPcategoryService {


  private categoryUrl = 'https://app.adrbalears.es/wp-json/wp/v2/categories'


  headers = new HttpHeaders()
    .set( 'Content-Type', 'application/vnd.api+json' ) 
 
  constructor( private http: HttpClient, private messagesService: MessageService ) { }

  getAll() {
    this.messagesService.add('CategoryService: fetched ALL categories')
    return this.http.get<WpCategory>( this.categoryUrl, { headers: this.headers } )
  }

  get(id: string) {
    this.messagesService.add('CategoryService: fetched a category')
    return this.http.get<WpCategory>( `${this.categoryUrl}/${id}`, { headers: this.headers } )
  }
}