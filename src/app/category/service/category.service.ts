import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryResponse } from '../interface/CategoryResponse.interface';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { CategoryRequestSave, CategoryRequestUpdate } from '../interface/CategoryRequest.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  public getAll(): Observable<CategoryResponse> {
      return this._http.get<CategoryResponse>("http://localhost:8080/api/v1/category")
  }

  public getById(id: number): Observable<CategoryResponse> {
    return this._http.get<CategoryResponse>(`http://localhost:8080/api/v1/category/${id}`)
  }

  public save(object: CategoryRequestSave): Observable<CategoryResponse> {
    return this._http.post<CategoryResponse>(`http://localhost:8080/api/v1/category`, object)
  }

  public update(id: number, object: CategoryRequestUpdate): Observable<CategoryResponse> {
    return this._http.put<CategoryResponse>(`http://localhost:8080/api/v1/category/${id}`, object)
  }


  constructor(
    private _http: HttpClient
  ){ }
}
