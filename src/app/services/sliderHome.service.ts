import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SliderHomeDTO } from '../Models/sliderhome.dto';

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
export class SliderHomeService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<SliderHomeDTO[]> {
      return this.http
        .get<SliderHomeDTO[]>(`${URL_MOCKS}slider-home.json`)
  }

}
