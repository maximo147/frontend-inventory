import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryResponse } from '../interface/CategoryResponse.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  public getAll(): Observable<CategoryResponse> {
      return this._http.get<CategoryResponse>("http://localhost:8080/api/v1/category")
  }


  constructor(
    private _http: HttpClient
  ){ }
}
