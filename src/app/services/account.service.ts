import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {AccountDetails} from "../model/account.model";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http:HttpClient) { }

  public getAccount(account_id:string,page : number,size:number):Observable<AccountDetails>{
    return this.http.get<AccountDetails>(environment.backendHost+"/accounts/"+account_id+"/pageOperations?page="+page+"&size="+size)
  }
  public debit(account_id:string,amount:number,description:string){
    let data = { account_id :account_id ,amount:amount,description:description}
    return this.http.post(environment.backendHost+"/accounts/debit",data)
  }
  public credit(account_id:string,amount:number,description:string){
    let data = { account_id :account_id ,amount:amount,description:description}
    return this.http.post(environment.backendHost+"/accounts/credit",data)
  }
  public transfer(accountSource:string,accountDestination:string,amount:number){
    let data= {accountSource , accountDestination ,amount}
    return this.http.post(environment.backendHost+"/accounts/transfer",data)
  }
}
