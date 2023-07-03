import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Alarm, AnalogInput, CreateAlarm, CreateAnalogInput, CreateDigitalInput, DigitalInput } from '../dto/InputDTOs';
import { environment } from '../environment';
import { Observable } from 'rxjs';
import { AnalogOutput, CreateAnalogOutput, CreateDigitalOutput, DigitalOutput } from '../dto/OutputDTOs';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private http: HttpClient) { }

  digitalOutputCreated: EventEmitter<DigitalOutput> = new EventEmitter()
  digitalOutputDeleted: EventEmitter<DigitalOutput> = new EventEmitter()
  analogOutputCreated: EventEmitter<AnalogOutput> = new EventEmitter()
  analogOutputDeleted: EventEmitter<AnalogOutput> = new EventEmitter()

  // Inputs

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


  // Outputs
  createAnalogOutput(dto: CreateAnalogOutput) : Observable<AnalogOutput> {
    return this.http.post<AnalogOutput>(`${environment.apiHost}/tag/analog/output`, dto)
  }

  updateAnalogOutput(dto: CreateAnalogOutput, id: number) : Observable<AnalogOutput> {
    return this.http.put<AnalogOutput>(`${environment.apiHost}/tag/analog/output/${id}`, dto)
  }

  turnScanOnOffAnalogOutput(scan: boolean, id: number) : Observable<AnalogOutput> {
    return this.http.put<AnalogOutput>(`${environment.apiHost}/tag/analog/output/${id}/scan`, scan)
  }

  deleteAnalogOutput(id: number) : Observable<AnalogOutput> {
    return this.http.delete<AnalogOutput>(`${environment.apiHost}/tag/analog/output/${id}`)
  }

  getAnalogOutputs() : Observable<AnalogOutput[]> {
    return this.http.get<AnalogOutput[]>(`${environment.apiHost}/tag/analog/output`)
  }

  
  createDigitalOutput(dto: CreateDigitalOutput) : Observable<DigitalOutput> {
    return this.http.post<DigitalOutput>(`${environment.apiHost}/tag/digital/output`, dto)
  }

  updateDigitalOutput(dto: CreateDigitalOutput, id: number) : Observable<DigitalOutput> {
    return this.http.put<DigitalOutput>(`${environment.apiHost}/tag/digital/output/${id}`, dto)
  }

  turnScanOnOffDigitalOutput(scan: boolean, id: number) : Observable<DigitalOutput> {
    return this.http.put<DigitalOutput>(`${environment.apiHost}/tag/digital/output/${id}/scan`, scan)
  }

  deleteDigitalOutput(id: number) : Observable<DigitalOutput> {
    return this.http.delete<DigitalOutput>(`${environment.apiHost}/tag/digital/output/${id}`)
  }
  
  getDigitalOutputs() : Observable<DigitalOutput[]> {
    return this.http.get<DigitalOutput[]>(`${environment.apiHost}/tag/digital/output`)
  }
}
