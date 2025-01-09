import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SharedService } from './shared.service';

const URL_API = '../../assets/phpAPI/'

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'text/plain'
  })
};

@Injectable({
  providedIn: 'root'
})
export class TramitsService {

  constructor( private http: HttpClient, private sharedService: SharedService) { }

  getAllXecsTramitsByConvo(convocatoria: string): Observable<any[]> {
    return this.http
     .get<any[]>(`${URL_API}totalSolicitudesPorConvocatoria.php?convocatoria=${convocatoria}`, httpOptions)
  }
}
