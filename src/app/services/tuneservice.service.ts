import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TuneserviceService {
Url = environment.apiUrl;

constructor(private http: HttpClient) { }

  getTunes(skip: number, limit: number, searchText: string): Observable<any> {
    let params: string = `?skip=${skip}&limit=${limit}`;
    if (searchText) {
        params += `&searchText=${encodeURIComponent(searchText)}`;
    }
    return this.http.get<any>(`${this.Url}${params}`);
  }
  
}
