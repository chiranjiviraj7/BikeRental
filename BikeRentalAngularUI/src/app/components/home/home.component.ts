import { Component, OnInit } from '@angular/core';
import { BikeService } from '../../services/bike.service';
import { Bike } from '../../models/bike.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  availableBikes: Bike[] = [];
  rentedBikes: Bike[] = [];
  allBikes: Bike[] = [];
  brands: string[] = [];
  selectedBrand: string = '';

  constructor(private bikeService: BikeService) { }

  ngOnInit(): void {
    this.bikeService.getBikes().subscribe({
      next: (bikes: Bike[]) => {
        this.allBikes = bikes;
        this.availableBikes = bikes.filter(bike => bike.status === '1');
        this.rentedBikes = bikes.filter(bike => bike.status === '0');
        this.getBrands();
      },
      error: (error) => {
        console.error('Error fetching bikes:', error);
      }
    });
  }

  // distinct brands from the bikes
  getBrands(): void {
    const bikeBrands = this.allBikes.map(bike => bike.brand);
    this.brands = Array.from(new Set(bikeBrands)); 
  }

  // Filter bikes based on selected brand
  filterBikesByBrand(brand: string): void {
    this.selectedBrand = brand;
    this.availableBikes = this.allBikes.filter(bike => bike.status === '1' && bike.brand === brand);
    this.rentedBikes = this.allBikes.filter(bike => bike.status === '0' && bike.brand === brand);
  }

  // when no brand is selected
  showAllBikes(): void {
    this.selectedBrand = '';
    this.availableBikes = this.allBikes.filter(bike => bike.status === '1');
    this.rentedBikes = this.allBikes.filter(bike => bike.status === '0');
  }
}
