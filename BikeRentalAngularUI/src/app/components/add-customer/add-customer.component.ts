import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../models/customer.model';
import { GeneralAlertDialogComponent } from '../general-alert-dialog/general-alert-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {
  custName: string = '';
  custPhNo: string = '';
  bikeId: number | null = null;

  ngOnInit(): void {
    this.bikeId = Number(this.route.snapshot.paramMap.get('bikeId'));
  }

  constructor(private customerService: CustomerService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router) { }

  addCustomer(): void {
    if (!this.custName || !this.custPhNo) {
      alert('Please provide all customer details');
      return;
    }

    this.customerService.getCustomerByNameAndPhone(this.custName, this.custPhNo).subscribe({
      next: (customer: Customer) => {
        alert('Customer already exists');
      },
      error: () => {
        // Customer doesn't exist
        const newCustomer = {
          custName: this.custName,
          custPhNo: this.custPhNo
        };

        this.customerService.addCustomer(newCustomer).subscribe({
          next: (newCustomerData: Customer) => {
            this.openAlertDialog('Success', 'Customer added successfully!', 'success');
            if (this.bikeId) {
              this.router.navigate([`/rent/${this.bikeId}`]);
            }
            else {
              this.router.navigate(['/']);
            }
          },
          error: (err) => {
            console.error('Error creating customer:', err);
            alert('Failed to create customer.');
          }
        });
      }
    });  
  }

  openAlertDialog(title: string, message: string, type: 'success' | 'error' | 'info'): void {
    this.dialog.open(GeneralAlertDialogComponent, {
      data: { title, message, type }
    });
  }
}
