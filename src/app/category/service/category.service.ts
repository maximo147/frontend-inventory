import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryResponse } from '../interface/CategoryResponse.interface';
import { HttpClient } from '@angular/common/http';
import { CategoryRequestSave, CategoryRequestUpdate } from '../interface/CategoryRequest.interface';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  public getAll(): Observable<CategoryResponse> {
      return this._http.get<CategoryResponse>(`${environment.url}/category`)
  }

  public getById(id: number): Observable<CategoryResponse> {
    return this._http.get<CategoryResponse>(`${environment.url}/category/${id}`)
  }

  public save(object: CategoryRequestSave): Observable<CategoryResponse> {
    return this._http.post<CategoryResponse>(`${environment.url}/category`, object)
  }

  public update(id: number, object: CategoryRequestUpdate): Observable<CategoryResponse> {
    return this._http.put<CategoryResponse>(`${environment.url}/category/${id}`, object)
  }

  public delete(id: number): Observable<CategoryResponse> {
    return this._http.delete<CategoryResponse>(`${environment.url}/category/${id}`)
  }

  /**
   * @param _http 
   */
  public getByIdOrName(id: number, name: string): Observable<CategoryResponse> {
    return this._http.get<CategoryResponse>(`${environment.url}/category/${id}/${name}`)
  }

  public exportExcel() {
    return this._http.get(`${environment.url}/category/export/excel`,{ responseType: 'blob' })
  }


  constructor(
    private _http: HttpClient
  ){ }
}
