import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { WpPost } from '../Models/wp-post-data.dto';
import { Observable } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})

export class WPpageService {
  private postUrl = 'https://app.adrbalears.es/wp-json/wp/v2/posts';

  headers = new HttpHeaders()
  .set( 'Content-Type', 'application/vnd.api+json' ) 

  constructor(private httpClient: HttpClient, private messagesService: MessageService) { }

  getAll(): Observable<WpPost[]> {
    this.messagesService.add('ArticleService: fetched ALL articles')
    return this.httpClient.get<WpPost[]>(this.postUrl, { headers: this.headers })
  }

  get(id: string|null): Observable<WpPost> {
    this.messagesService.add('ArticleService: fetched ONE article')
    return this.httpClient.get<WpPost>(`${this.postUrl}/${id}`, { headers: this.headers })
  }

  create(data: any): Observable<any> {
    return this.httpClient.post(this.postUrl, data, { headers: this.headers })
  }

  update(id: string, data: any): Observable<any> {
    return this.httpClient.put(`${this.postUrl}/${id}`, data, { headers: this.headers })
  }

  delete(id: string): Observable<any> {
    return this.httpClient.delete(`${this.postUrl}/${id}`, { headers: this.headers })
  }

  deleteAll(): Observable<any> {
    return this.httpClient.delete(this.postUrl, { headers: this.headers })
  }

  findByTitle(title: string): Observable<WpPost[]> {
    return this.httpClient.get<WpPost[]>(`${this.postUrl}?title=${title}`, { headers: this.headers })
  }

}
