import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment';
import { Observable } from 'rxjs';
import { TrendingState } from '../dto/InputDTOs';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  constructor(private http: HttpClient) { }

  startSystem(): Observable<any> {
    return this.http.get<any>(`${environment.apiHost}/core/start`)
  }

  stopSystem(): Observable<any> {
    return this.http.get<any>(`${environment.apiHost}/core/stop`)
  }

  getTrendingState(): Observable<any> {
    return this.http.get<any>(`${environment.apiHost}/core/trending`)
  }

}
