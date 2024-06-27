import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UriProjectConversionDTO } from '../Models/uri-project-conversion.dto';

const URL_API = '../../assets/phpAPI/'
const URL_MOCKS = '../../assets/mocks/'

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'text/plain' /* la única forma de evitar errores de CORS ha sido añadiendo esta cabecera */
  })
};

export interface updateResponse {
  affected: number;
}

export interface deleteResponse {
  affected: number;
}

@Injectable({
  providedIn: 'root'
})
export class UriConversionService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<UriProjectConversionDTO[]> {
      return this.http
        .get<UriProjectConversionDTO[]>(`${URL_MOCKS}uri-platform-project-list.json`)
  }

}
