import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { WpPost } from '../Models/wp-post-data.dto';
import { Observable } from 'rxjs';
import { MessageService } from './message.service';
import { WpPageFeaturedMedia } from '../Models/wp-page-featured-media.dto';

@Injectable({
  providedIn: 'root'
})

export class WPpostService {
  private postUrl =   'https://app.adrbalears.es/wp-json/wp/v2/posts';
  private mediaUrl =  'https://app.adrbalears.es/wp-json/wp/v2/media';
  private tagUrl =    'https://app.adrbalears.es/wp-json/wp/v2/tags';

  headers = new HttpHeaders()
  .set( 'Content-Type', 'application/vnd.api+json' ) 

  constructor(private httpClient: HttpClient, private messagesService: MessageService) { }

  getAllPosts(): Observable<WpPost[]> {
    /* Por defecto, Wordpress tiene limitado a 10 el número total de posts a devolver */
    /* Y como máximo admite 100 por página. Para más de 100 hay que ir pidiendo página a página con */
    /*  https://app.adrbalears.es/wp-json/wp/v2/posts/?per_page=100&page=1
    https://app.adrbalears.es/wp-json/wp/v2/posts/?per_page=100&page=2 */

    this.messagesService.add('ArticleService: fetched ALL articles')
    return this.httpClient.get<WpPost[]>(this.postUrl+'/?per_page=100&page=1', { headers: this.headers })
  }

  getOne(id: string|null): Observable<WpPost> {
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

  getOneFeaturedMedia(id: number|null): Observable<WpPageFeaturedMedia> {
    this.messagesService.add('ArticleService: fetched ONE media')
    return this.httpClient.get<WpPageFeaturedMedia>(`${this.mediaUrl}/${id}`)
  }

  getOneTag(id: number|null): Observable<WpPageFeaturedMedia> {
    this.messagesService.add('ArticleService: fetched ONE media')
    return this.httpClient.get<WpPageFeaturedMedia>(`${this.tagUrl}/${id}`)
  }

}
