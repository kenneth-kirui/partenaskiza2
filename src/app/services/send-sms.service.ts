import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SendSMSService {

  constructor(private http: HttpClient) { }

  sendSms(mobileNumber: string): Observable<any> {

    const payload = {
          phone_number : mobileNumber,
        }
    return this.http.post(environment.smsUrl, payload, {
      headers: { 'Content-Type': 'application/json' } 
    });
  }
}
