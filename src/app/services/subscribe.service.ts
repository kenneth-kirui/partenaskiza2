import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubscribeService {


  constructor(private http: HttpClient) { }
  
    subscribeTune(mobileNumber: string, code:string): Observable<any> {
  
      const payload = {
        phone_number: mobileNumber,
        skiza_code:code
          }
      return this.http.post(environment.subscribeUrl, payload, {
        headers: { 'Content-Type': 'application/json' } 
      });
    }
}
