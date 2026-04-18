import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = 'https://localhost:7076/api/Customer';

  constructor(private http: HttpClient) { }

  
  getCustomerByName(name: string): Observable<Customer> {
    return this.http.get<Customer>(`${this.apiUrl}/by-name/${name}`);
  }
  
  getCustomerByNameAndPhone(custName: string, custPhNo: string): Observable<Customer> {
    return this.http.get<Customer>(`${this.apiUrl}/byNameAndPhone?name=${custName}&phone=${custPhNo}`);
  }

  //(omit to create a interface without custId)
  addCustomer(customer: Omit<Customer, 'custId'>): Observable<Customer> {
    return this.http.post<Customer>(this.apiUrl, customer);
  }
  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.apiUrl);
  }
}
