import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CooperativaDTO } from '../Models/cooperativa.dto';
import { Observable } from 'rxjs';
import { MessageService } from './message.service';

/* 
Params:

program_id:

1 >>JEP
2 >>JES
3 >> JEA

schoolastic_year_id: 

1 >> 2021
2 >> 2022
3 >> 2023
4 >> 2024

Autentication: Bearer IDI1234 */

@Injectable({
  providedIn: 'root'
})
export class IbemprenjoveService {
 private wp_Key = 'IDI1234'
 private apiBaseUrl = 'https://app.iemprenjove.es/api/cooperatives'

 headers = new HttpHeaders()
 .set( 'Content-Type', 'application/vnd.api+json' ) 
 .set( 'X-Joomla-Token', this.wp_Key )

  constructor( private httpClient: HttpClient, private messagesService: MessageService ) { }

  getAll(program_id: number, schoolastic_year_id: number): Observable<CooperativaDTO[]> {
    this.messagesService.add('ArticleService: fetched ALL articles')
    return this.httpClient.get<CooperativaDTO[]>(`${this.apiBaseUrl}?program_id=${program_id}&schoolastic_year_id=${schoolastic_year_id}`, { headers: this.headers })
  }

}
