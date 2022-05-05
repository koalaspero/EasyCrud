import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductDBService {

  constructor(private http: HttpClient) { }

  postProduct(data: any){
    return this.http.post<any>('http://localhost:3000/products', data)
  }

  getProduct(){
    return this.http.get<any>('http://localhost:3000/products')
  }

  updateProd(id: any, data: any){
    return this.http.put<any>('http://localhost:3000/products/'+id, data)
  }

  deleteProd(id: any){
    return this.http.delete<any>('http://localhost:3000/products/'+id)
  }
}
