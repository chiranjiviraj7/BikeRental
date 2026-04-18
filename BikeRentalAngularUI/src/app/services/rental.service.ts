import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { RentRequestModel } from '../models/RentRequest.model';
import { ReturnRequestModel } from '../models/ReturnRequest.model';
import { RentalHistory } from '../models/RentalHistory.model';
import { Customer } from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  private apiUrl = 'https://localhost:7076/api/Rental'; 

  constructor(private http: HttpClient) { }
  
  rentBike(rentData: RentRequestModel): Observable<RentRequestModel> {
    console.log('Rent Data:', rentData);
    return this.http.post<RentRequestModel>(`${this.apiUrl}/rent`, rentData).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error renting bike:', error);
        return throwError(() => new Error('Failed to rent the bike'));
      })
    );
  }
  
  getRentalsByCustomer(customerId: number): Observable<RentRequestModel[]> {
    return this.http.get<RentRequestModel[]>(`${this.apiUrl}/by-customer/${customerId}`);
  }
  getCustomersByBike(bikeId: number): Observable<Customer[]> {
    return this.http.get<Customer[]>(`https://localhost:7076/api/Rental/customers-by-bike/${bikeId}`);
  }

  getActiveRentals(): Observable<number[]> {
    return this.http.get<number[]>(`${this.apiUrl}/GetActiveRentals`);
  }

  returnBike(returnRequest: ReturnRequestModel): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/return`, returnRequest);
  }

  getBikeRentalHistory(bikeId: number): Observable<RentalHistory[]> {
  return this.http.get<RentalHistory[]>(`https://localhost:7076/api/Rental/history/${bikeId}`)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error fetching rental history:', error);
        return throwError('Error fetching rental history, please try again later.');
      })
    );
}
}
