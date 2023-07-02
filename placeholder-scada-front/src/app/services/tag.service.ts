import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Alarm, AnalogInput, CreateAlarm, CreateAnalogInput, CreateDigitalInput, DigitalInput } from '../dto/InputDTOs';
import { environment } from '../environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private http: HttpClient) { }

  createAnalogInput(dto: CreateAnalogInput) : Observable<AnalogInput> {
    return this.http.post<AnalogInput>(`${environment.apiHost}/tag/analog/input`, dto)
  }

  updateAnalogInput(dto: CreateAnalogInput, id: number) : Observable<AnalogInput> {
    return this.http.put<AnalogInput>(`${environment.apiHost}/tag/analog/input/${id}`, dto)
  }

  turnScanOnOffAnalogInput(scan: boolean, id: number) : Observable<AnalogInput> {
    return this.http.put<AnalogInput>(`${environment.apiHost}/tag/analog/input/${id}/scan`, scan)
  }

  deleteAnalogInput(id: number) : Observable<AnalogInput> {
    return this.http.delete<AnalogInput>(`${environment.apiHost}/tag/analog/input/${id}`)
  }

  getAnalogInputs() : Observable<AnalogInput[]> {
    return this.http.get<AnalogInput[]>(`${environment.apiHost}/tag/analog/input`)
  }

  
  createDigitalInput(dto: CreateDigitalInput) : Observable<DigitalInput> {
    return this.http.post<DigitalInput>(`${environment.apiHost}/tag/digital/input`, dto)
  }

  updateDigitalInput(dto: CreateDigitalInput, id: number) : Observable<DigitalInput> {
    return this.http.put<DigitalInput>(`${environment.apiHost}/tag/digital/input/${id}`, dto)
  }

  turnScanOnOffDigitalInput(scan: boolean, id: number) : Observable<DigitalInput> {
    return this.http.put<DigitalInput>(`${environment.apiHost}/tag/digital/input/${id}/scan`, scan)
  }

  deleteDigitalInput(id: number) : Observable<DigitalInput> {
    return this.http.delete<DigitalInput>(`${environment.apiHost}/tag/digital/input/${id}`)
  }
  
  getDigitalInputs() : Observable<DigitalInput[]> {
    return this.http.get<DigitalInput[]>(`${environment.apiHost}/tag/digital/input`)
  }

  createAlarm(dto: CreateAlarm) : Observable<Alarm> {
    return this.http.post<Alarm>(`${environment.apiHost}/tag/alarm`, dto)
  }

  deleteAlarm(id: number) : Observable<Alarm> {
    return this.http.delete<Alarm>(`${environment.apiHost}/tag/alarm/${id}`)
  }
}
