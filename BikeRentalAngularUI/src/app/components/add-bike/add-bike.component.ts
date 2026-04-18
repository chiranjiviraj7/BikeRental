import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BikeService } from '../../services/bike.service';
import { Bike } from '../../models/bike.model';

@Component({
  selector: 'app-add-bike',
  templateUrl: './add-bike.component.html',
  styleUrls: ['./add-bike.component.css']
})
export class AddBikeComponent implements OnInit {
  bikeForm!: FormGroup;
  bikeBrands: string[] = [];
  bikeTypes: string[] = [];

  constructor(
    private router: Router,
    private bikeService: BikeService
  ) { }

  ngOnInit(): void {
    this.loadBikeBrands();
    this.loadBikeType();
    this.bikeForm = new FormGroup({
      bikeName: new FormControl('', Validators.required),
      brand: new FormControl('', Validators.required),
      customBrand: new FormControl(''), // Optional field for custom brand
      type: new FormControl('', Validators.required),
      customType: new FormControl(''), // Optional field for custom type
      rentalAmount: new FormControl(1000, [Validators.required, Validators.min(1)]),
      bikeCount: new FormControl(1, [Validators.required, Validators.min(1)]),
      imageUrl: new FormControl(''), // Optional field
      bikeDetails: new FormControl('', Validators.required) 
    });
  }

  loadBikeBrands() {
    this.bikeService.getUniqueBrands().subscribe((brands: string[]) => {
      this.bikeBrands = brands;
    }, error => {
      console.error('Error fetching bike brands', error);
    });
  }
  loadBikeType() {
    this.bikeService.getUniqueType().subscribe((type: string[]) => {
      this.bikeTypes = type;
    }, error => {
      console.error('Error fetching bike brands', error);
    });
  }
  onBrandChange(selectedBrand: string): void {
    if (selectedBrand !== 'other') {
      this.bikeForm.get('customBrand')?.reset(); // Reset the custom brand if a predefined option is selected
    }
  }

  onTypeChange(selectedType: string): void {
    if (selectedType !== 'other') {
      this.bikeForm.get('customType')?.reset(); // Reset the custom type if a predefined option is selected
    }
  }

  saveBike(): void {
    if (this.bikeForm.invalid) {
      this.bikeForm.markAllAsTouched();
      return;
    }

    // form data
    const newBike: Bike = {
      ...this.bikeForm.value,
      status: '1',
      bikeId: 0,
      brand: this.bikeForm.value.brand === 'other' ? this.bikeForm.value.customBrand : this.bikeForm.value.brand, // Set the correct brand
      type: this.bikeForm.value.type === 'other' ? this.bikeForm.value.customType : this.bikeForm.value.type // Set the correct type
    };

    // Add bike
    this.bikeService.addBike(newBike).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
