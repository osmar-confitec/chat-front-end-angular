import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { QueryString } from '../util/query-string';
import { Observable } from 'rxjs';
import { ReturnHttp } from '../models/returnHttp';
import PageResponse from '../models/page-response';
import Customer from '../models/customer';
import CustomerGetResponse from '../models/customerGetResponse';

@Injectable({
  providedIn: 'root'
})
export class CustomerService extends BaseService {


  protected getController(): string {
    return `customer`;
  }

  constructor(private http: HttpClient){
    super();
  }
  
  getCustomers(customer:Customer):Observable<ReturnHttp<CustomerGetResponse>>
  {
     return this.http.get<ReturnHttp<CustomerGetResponse>>(`${this.getUrl()}?${QueryString.toString(customer)}`,super.GetHeaderJson())
     ;
  }
  getCustomersExcept(id:string):Observable<ReturnHttp<CustomerGetResponse>>
  {
     return this.http.get<ReturnHttp<CustomerGetResponse>>(`${this.getUrl()}/allExcept?id=${id}`,super.GetHeaderJson())
     ;
  }
}
