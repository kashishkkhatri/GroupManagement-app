import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupUserService {

  constructor(private _http: HttpClient) { }

  deleteGroupUser(id: number, userId: number): Observable<any> {
    return this._http.delete(`http://127.0.0.1:8000/api/groups/${id}/users/${userId}`);
  }

  addGroupUser(id: number, userId: number): Observable<any> {
    return this._http.post(`http://127.0.0.1:8000/api/groups/${id}/users/${userId}`,null);
  }
}
