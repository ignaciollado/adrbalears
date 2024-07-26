import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatasetsIBESTATDTO } from '../Models/ibestat.dto';
import { Observable } from 'rxjs';
import { MessageService } from './message.service';


/**
 * base_url: https://ibestat.es/edatos/apis/statistical-resources
 * end point:  /v1.0/datasets/{agencyID}/{resourceID}/{version} 
  */

@Injectable({
  providedIn: 'root'
})
export class IbestatService {
  private ibestat_Key = ''
  private baseUrl = 'https://ibestat.es/edatos/apis/statistical-resources'
 
  headers = new HttpHeaders()
  .set( 'Content-Type', 'application/vnd.api+json' ) 
  .set( 'X-Joomla-Token', this.ibestat_Key )
 
   constructor( private httpClient: HttpClient, private messagesService: MessageService ) { }
 
   getDatastets(agencyID: string, resourceID?: string, version?: string): Observable<DatasetsIBESTATDTO[]> {
     this.messagesService.add('ArticleService: fetched ALL articles')
     let theParams: string

     theParams = "/"+agencyID
     if (resourceID) {
      theParams += "/"+resourceID
     }
     if (version) {
      theParams += "/"+version+"/"
     }
     return this.httpClient.get<DatasetsIBESTATDTO[]>(`${this.baseUrl}/v1.0/datasets${theParams}`)
   }
}
