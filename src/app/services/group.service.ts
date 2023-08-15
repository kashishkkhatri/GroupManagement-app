import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private _http: HttpClient) { }

  addGroup(data: any): Observable<any> {
    return this._http.post('http://127.0.0.1:8000/api/groups', data);
  }

  getGroupById(id: number): Observable<any> {
    return this._http.get(`http://127.0.0.1:8000/api/groups/${id}`);
  }

  updateGroup(id: number, data: any): Observable<any> {
    return this._http.put(`http://127.0.0.1:8000/api/groups/${id}`, data);
  }

  getGroupList(): Observable<any> {
    return this._http.get('http://127.0.0.1:8000/api/groups');
  }

  deleteGroup(id: number): Observable<any> {
    return this._http.delete(`http://127.0.0.1:8000/api/groups/${id}`);
  }
}
