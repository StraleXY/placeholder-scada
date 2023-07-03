import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateRealTimeUnit, RealTimeUnit } from '../dto/OutputDTOs';
import { environment } from '../environment';
import { animate } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class RtuService {

    constructor(private http: HttpClient) { }
    
    createRTU(dto: CreateRealTimeUnit) : Observable<RealTimeUnit> {
        return this.http.post<RealTimeUnit>(`${environment.apiHost}/core/rtu`, dto)
    }

    getAll() : Observable<RealTimeUnit[]> {
        return this.http.get<RealTimeUnit[]>(`${environment.apiHost}/core/rtu`)
    }
    
    deleteRtu(id: number) : Observable<any> {
        return this.http.delete<any>(`${environment.apiHost}/core/rtu/${id}`)
    }
}
