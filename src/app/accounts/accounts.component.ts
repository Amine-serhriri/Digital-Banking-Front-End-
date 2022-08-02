import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AccountService} from "../services/account.service";
import {catchError, Observable, throwError} from "rxjs";
import {AccountDetails} from "../model/account.model";

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  accountFormGroup!:FormGroup
  currentPage:number=0
  pageSize : number=5
  accountObservable! : Observable<AccountDetails>
  operationFormGroup!:FormGroup;
  errorMessage! : string


  constructor(private fb:FormBuilder,
              private accountService:AccountService) { }

  ngOnInit(): void {
    this.accountFormGroup=this.fb.group({
      account_id : this.fb.control('')
    });
    this.operationFormGroup=this.fb.group({
      operationType : this.fb.control(null),
      amount : this.fb.control(0),
      description : this.fb.control(null),
      account_destination : this.fb.control(null)
    })


  }

  handleSearchAccount() {
    let accountid : string =this.accountFormGroup.value.account_id
    this.accountObservable=this.accountService.getAccount(accountid,this.currentPage,this.pageSize).pipe(
      catchError(err=>{
        this.errorMessage=err.message;
        return throwError(err)
      })
    )

  }

  gotoPage(p: number) {
    this.currentPage=p
    this.handleSearchAccount()
  }

  handleAccountOperation() {
    let account_id : string =this.accountFormGroup.value.account_id;
    let operationType=this.operationFormGroup.value.operationType;
    let amount:number = this.operationFormGroup.value.amount;
    let description=this.operationFormGroup.value.description;
    let account_destination=this.operationFormGroup.value.account_destination;
    if(operationType=='DEBIT'){
      this.accountService.debit(account_id,amount,description).subscribe({
        next :(data)=>{
          alert("Success CREDIT ")
          this.operationFormGroup.reset()
        },error : (err)=>{
          console.log(err)
        }
      })
    }else if(operationType=='CREDIT'){
      this.accountService.credit(account_id,amount,description).subscribe({
        next :(data)=>{
          alert("Success DEBIT ")
          this.operationFormGroup.reset()
          this.handleSearchAccount()
        },error : (err)=>{
          console.log(err)
        }
      })
    }else if(operationType=='TRANSFER'){
      this.accountService.transfer(account_id,account_destination,amount).subscribe({
        next :(data)=>{
          alert("Success Transfer ")
          this.operationFormGroup.reset()
          this.handleSearchAccount()
        },error : (err)=>{
          console.log(err)
        }
      })
    }
  }
}
