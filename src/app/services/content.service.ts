import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { genericDataDTO } from '../model/generic-data.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private url = 'http://jsonplaceholder.typicode.com/posts';

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
