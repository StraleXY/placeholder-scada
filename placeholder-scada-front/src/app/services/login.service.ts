import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

    constructor(private http: HttpClient) { }

    login(user: object): Observable<any> {
        return this.http.post<any>(`${environment.apiHost}/user/login`, user);
    }

    register(user: object): Observable<any> {
        return this.http.post<any>(`${environment.apiHost}/user/register`, user);
    }
}
