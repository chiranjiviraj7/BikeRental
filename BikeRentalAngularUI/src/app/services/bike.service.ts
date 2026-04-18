import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bike } from '../models/bike.model';

@Injectable({
  providedIn: 'root'
})
export class BikeService {
  private apiUrl = 'https://localhost:7076/api/Bike'; 

  constructor(private http: HttpClient) { }
  
  getBikes(): Observable<Bike[]> {
    return this.http.get<Bike[]>(this.apiUrl);
  }
  updateBikeCount(bikeId: number, count: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${bikeId}/count`,  count);
  }

  getBike(id: number): Observable<Bike> {
    return this.http.get<Bike>(`${this.apiUrl}/${id}`);
  }
  getUniqueBrands(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/getUniqueBrands`);
  }
  getUniqueType(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/getUniqueType`);
  }
  addBike(bike: Bike): Observable<Bike> {
    return this.http.post<Bike>(this.apiUrl, bike);
  }
  
  updateRentalAmount(id: number, rentalAmount: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/rentalAmount`, rentalAmount);
  }
  
  updateBikeStatus(id: number, status: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/status`, { status });
  }
  
  deleteBike(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  rentBike(rentData: { bikeId: number, userName: string, duration: number }): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/rent`, rentData);
  }
}
