import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Customer} from "../model/customer.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http:HttpClient) { }

  public getCustomer():Observable<Array<Customer>>{
    return this.http.get<Array<Customer>>(environment.backendHost+"/clients")
  }
  public searchCustomers(keyword:string):Observable<Array<Customer>>{
    return this.http.get<Array<Customer>>(environment.backendHost+"/clients/search?keyword="+keyword)
  }
  public saveCustomers(customer:Customer):Observable<Customer>{
    return this.http.post<Customer>(environment.backendHost+"/clients/",customer)
  }
  public deleteCustomers(id:number){
    return this.http.delete(environment.backendHost+"/clients/"+id)
  }

}
