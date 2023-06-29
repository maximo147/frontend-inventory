import { Injectable } from '@angular/core';
import { ProductResponse } from '../interface/ProductResponse.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { ProductRequestSave, ProductRequestUpdate } from '../interface/ProductRequest.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public getAll(): Observable<ProductResponse> {
    return this._http.get<ProductResponse>(`${environment.url}/product`)
  }

  public getById(id: number): Observable<ProductResponse> {
    return this._http.get<ProductResponse>(`${environment.url}/product/${id}`)
  }

  public save(object: FormData): Observable<ProductResponse> {
    console.log("OBJETO: ", object)
    return this._http.post<ProductResponse>(`${environment.url}/product`, object)
  }

  public update(id: number, object: FormData): Observable<ProductResponse> {
    return this._http.patch<ProductResponse>(`${environment.url}/product/${id}`, object)
  }

  public delete(id: number): Observable<ProductResponse> {
    return this._http.delete<ProductResponse>(`${environment.url}/product/${id}`)
  }

  /**
   * @param _http 
   */
  public getByIdOrName(id: number, name: string): Observable<ProductResponse> {
    return this._http.get<ProductResponse>(`${environment.url}/product/${id}/${name}`)
  }

  public exportExcel() {
    return this._http.get(`${environment.url}/product/export/excel`,{ responseType: 'blob' })
  }


  constructor(
    private _http: HttpClient
  ){ }
}
