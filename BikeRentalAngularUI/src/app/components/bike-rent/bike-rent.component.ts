import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RentalService } from '../../services/rental.service';
import { CustomerService } from '../../services/customer.service';
import { RentRequestModel } from '../../models/RentRequest.model';
import { Customer } from '../../models/customer.model';
import { GeneralAlertDialogComponent } from '../general-alert-dialog/general-alert-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-bike-rent',
  templateUrl: './bike-rent.component.html',
  styleUrls: ['./bike-rent.component.css']
})
export class BikeRentComponent implements OnInit {

  rentForm!: FormGroup;
  customers: Customer[] = [];
  isPhoneNumberError: boolean = false;
  bikeId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private rentalService: RentalService,
    private customerService: CustomerService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.bikeId = Number(this.route.snapshot.paramMap.get('bikeId'));
    this.loadCustomers();

    // Initialize form group
    this.rentForm = new FormGroup({
      username: new FormControl('', Validators.required),
      phoneNo: new FormControl('', Validators.required),
      duration: new FormControl('1', [Validators.required, Validators.min(1)])
    });
  }

  loadCustomers(): void {
    this.customerService.getCustomers().subscribe({
      next: (customers: Customer[]) => {
        this.customers = customers;

        // Filtering out active rentals
        this.rentalService.getActiveRentals().subscribe({
          next: (rentedCustomerIds: number[]) => {
            this.customers = this.customers.filter(customer => !rentedCustomerIds.includes(customer.custId));
            
          },
          error: (error) => {
            console.error('Error fetching active rentals:', error);
          }
        });
      },
      error: (error) => {
        console.error('Error fetching customers:', error);
      }
    });
  }

  /*loadCustomers(): void {
    this.customerService.getCustomers().subscribe({
      next: (data: Customer[]) => {
        this.customers = data;
        console.log('Customers loaded:', this.customers); 
      },
      error: (error) => {
        console.error('Error fetching customers:', error);
      }
    });
  }*/

  rentBike(): void {
    if (this.rentForm.invalid) {
      this.rentForm.markAllAsTouched();
      return;
    }

    const { username, phoneNo, duration } = this.rentForm.value;

    // Check if the customer exists
    this.customerService.getCustomerByNameAndPhone(username, phoneNo).subscribe({
      next: (customer: Customer) => {
        this.processRental(customer.custId);
      },
      error: () => {
        this.isPhoneNumberError = true;
       /* console.log('Phone', this.isPhoneNumberError);*/
        this.rentForm.get('phoneNo')?.setErrors({ incorrect: true });
      }
    });
  }

  private processRental(customerId: number): void {
    const rentData: RentRequestModel = {
      bikeId: this.bikeId!,
      custName: this.rentForm.get('username')?.value,
      duration: this.rentForm.get('duration')?.value
    };

    this.rentalService.rentBike(rentData).subscribe(
      () => {
        
        localStorage.setItem(`bike_${this.bikeId}_custName`, this.rentForm.get('username')?.value);
        localStorage.setItem(`bike_${this.bikeId}_custPhNo`, this.rentForm.get('phoneNo')?.value);
        
        this.openAlertDialog('Enjoy Your Ride!', 'Bike rented successfully!', 'success'); 
        this.router.navigate(['/']);
      },
      (error) => {
        /*console.error('Error renting bike:', error);*/
        alert('Failed to rent the bike.');
      }
    );
  }
  openAlertDialog(title: string, message: string, type: 'success' | 'error' | 'info'): void {
    this.dialog.open(GeneralAlertDialogComponent, {
      data: { title, message, type }
    });
  }
}

