import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './environment';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(private http: HttpClient) { }

  getAlarmsBetween(dto: any) : Observable<any> {
    return this.http.post<any>(`${environment.apiHost}/report/alarms/between`, dto)
  }

  getAlarmsOfPriority(priority: any) : Observable<any> {
    return this.http.get<any>(`${environment.apiHost}/report/alarms/${priority}`)
  }

  getValuesInTimeSpan(dto: any) : Observable<any> {
    return this.http.post<any>(`${environment.apiHost}/report/values/between`, dto)
  }

  getValuesAnalog() : Observable<any> {
    return this.http.get<any>(`${environment.apiHost}/report/values/analog`)
  }

  getValuesDigital() : Observable<any> {
    return this.http.get<any>(`${environment.apiHost}/report/values/digital`)
  }

  getAllTagValues(analog: any, id: any) : Observable<any> {
    return this.http.get<any>(`${environment.apiHost}/report/values/tag/${analog}/${id}`)
  }
}
