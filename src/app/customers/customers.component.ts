import { Component, OnInit } from '@angular/core';
import {HttpClient, } from "@angular/common/http";
import {CustomerService} from "../services/customer.service";
import {catchError, Observable, throwError} from "rxjs";
import {Customer} from "../model/customer.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {state} from "@angular/animations";

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  customers!:Observable<Array<Customer>>;
  errorMessage! : string;
  searchFormGroup : FormGroup | undefined;


  constructor(private customerService:CustomerService,
              private fb:FormBuilder,
              private route:Router) { }

  ngOnInit(): void {
    this.searchFormGroup=this.fb.group({
      keyword : this.fb.control("")
    });
    this.customers=this.customerService.getCustomer().pipe(
      catchError(err => {
        this.errorMessage=err.message;
        return throwError(err)
      })
    );
  }

  handelSearchCustomers() {
    let kw= this.searchFormGroup?.value.keyword
    this.customers=this.customerService.searchCustomers(kw).pipe(
    catchError(err => {
      this.errorMessage=err.message;
      return throwError(err)
    })
  );


  }

  handleDeleteCustomer(c: Customer) {
    let conf =confirm("ête-vous sûr de couloir supprimer")
    if(!conf )return;
    this.customerService.deleteCustomers(c.id).subscribe({
      next :(value) => {
        this.handelSearchCustomers()
      },
      error : err => {
        console.log(err)
      }
    })
  }

  handleCustomerAccount(c: Customer) {
  this.route.navigateByUrl("/customer-accounts/"+c.id,{state  :c})
  }
}
