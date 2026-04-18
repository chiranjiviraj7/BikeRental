import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RentalService } from '../../services/rental.service';
/*import { CustomerService } from '../../services/customer.service';*/
import { Customer } from '../../models/customer.model';
import { GeneralAlertDialogComponent } from '../general-alert-dialog/general-alert-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-return-bike',
  templateUrl: './return-bike.component.html',
  styleUrls: ['./return-bike.component.css']
})
export class ReturnBikeComponent implements OnInit {

  returnForm!: FormGroup;
  customers: Customer[] = [];
  customerCount: number = 0; 
  bikeId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private rentalService: RentalService,
    /*private customerService: CustomerService,*/
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.bikeId = Number(this.route.snapshot.paramMap.get('bikeId'));
    this.loadCustomersByBike(this.bikeId!);

    // Initialize form group with form controls
    this.returnForm = new FormGroup({
      custName: new FormControl('', Validators.required),
      custPhNo: new FormControl('', Validators.required),
    });
  }

  loadCustomersByBike(bikeId: number): void {
    this.rentalService.getCustomersByBike(bikeId).subscribe({
      next: (data: Customer[]) => {
        this.customers = data;
        this.customerCount = this.customers.length; // Update the customer count
        /*console.log('Customers loaded:', this.customers);*/
        console.log('Customer Count:', this.customerCount);
      },
      error: (error) => {
        console.error('Error fetching customers:', error);
        console.log('Response body:', error.error);
      }
    });
  }


  returnBike(): void {
    if (this.returnForm.invalid) {
      this.returnForm.markAllAsTouched();
      return;
    }

    const { custName, custPhNo } = this.returnForm.value;

    // Calling return bike method in rental service
    this.rentalService.returnBike({
      custName,
      custPhNo,
      bikeId: this.bikeId!
    }).subscribe({
      next: (cost) => {
        this.openAlertDialog('Success', 'Bike returned successfully! Cost: ' + cost, 'success');
        this.router.navigate(['/bike', this.bikeId]); // Navigate to bike details page
      },
      error: (error) => {
        console.error('Error returning bike:', error);
        this.openAlertDialog('Error', 'Failed to return the bike.', 'error');
      }
    });
  }

  openAlertDialog(title: string, message: string, type: 'success' | 'error' | 'info'): void {
    this.dialog.open(GeneralAlertDialogComponent, {
      data: { title, message, type }
    });
  }
}
