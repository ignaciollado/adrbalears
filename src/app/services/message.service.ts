import { Injectable } from '@angular/core';
import { genericMailDTO } from '../Models/generic-data.dto';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const URL_API_SEND = 'https://tramits.idi.es/public/assets/utils/enviaCorreoElectronicoANGULAR.php'

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'text/plain' /* la única forma de evitar errores de CORS ha sido añadiendo esta cabecera */
  })
};

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messages: string[] = [];

  constructor(private http: HttpClient) { }

  sendMail(formData: genericMailDTO): Observable<genericMailDTO[]> {
    const email: string = formData.email
    const requester: string = formData.requester
    const contactPhone: string = formData.contactPhone
    const subject: string = formData.subject
    const body: string = formData.body

    console.log (email, subject, body, URL_API_SEND)
    return this.http
      .get<genericMailDTO[]>(`${URL_API_SEND}?${email}/${requester}/${requester}/${subject}/${body}`, httpOptions)
  }

  add(message: string) {
    this.messages.push(message)
  }

  clear() {
    this.messages = []
  }
  
}

