import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BikeService } from '../../services/bike.service';
import { RentalService } from '../../services/rental.service';
import { Bike } from '../../models/bike.model';
import { ReturnRequestModel } from '../../models/ReturnRequest.model';
import { RentalHistory } from '../../models/RentalHistory.model';
import { GeneralAlertDialogComponent } from '../general-alert-dialog/general-alert-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { RentalHistoryDialogComponent } from '../rental-history-dialog/rental-history-dialog.component';


@Component({
  selector: 'app-bike-detail',
  templateUrl: './bike-details.component.html',
  styleUrls: ['./bike-details.component.css'],

})
export class BikeDetailsComponent implements OnInit {
  bike: Bike | null = null;
  rentalCost: number | null = null; 
  custName: string = ''; 
  custPhNo: string = '';
  customerCount: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bikeService: BikeService,
    private rentalService: RentalService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadBike();
  }

  loadBike(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.rentalService.getCustomersByBike(id).subscribe({
      next: (customers) => {
        this.customerCount = customers.length; 
        /* console.log('Customer Count:', this.customerCount); */
      },
      error: (error) => {
        console.error('Error fetching customer count:', error);
      }
    });

    this.bikeService.getBike(id).subscribe({
      next: (data: Bike) => {
        this.bike = data;
      },
      error: (error) => {
        console.error('Error fetching bike details:', error);
      }
    });
  }

  deleteBike(): void {
    if (this.bike) {
      const dialogRef = this.dialog.open(GeneralAlertDialogComponent, {
        data: {
          title: 'Confirm Deletion',
          message: 'Are you sure you want to delete this bike?',
          type: 'info',
          prompt: false
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result === 'confirm') { // Only proceed if the user confirmed the deletion
          this.bikeService.deleteBike(this.bike!.bikeId).subscribe(() => {
            this.openAlertDialog('Success', 'Bike deleted successfully!', 'success');
            this.router.navigate(['/']); // Navigate back to bike list after deletion
          }, error => {
            this.openAlertDialog('Error', 'Error deleting bike: ' + error.message, 'error');
          });
        }
      });
    }
  }


  updateRentalAmount(): void {
    if (this.bike) {
      const dialogRef = this.dialog.open(GeneralAlertDialogComponent, {
        data: {
          title: 'Update Rental Amount',
          message: 'Please enter the new rental amount:',
          prompt: true, // Indicating this is a prompt dialog
          userInput: this.bike.rentalAmount.toString() 
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          const rentalAmount = parseFloat(result);
          if (!isNaN(rentalAmount)) {
            this.bikeService.updateRentalAmount(this.bike!.bikeId, rentalAmount).subscribe(() => {
              this.openAlertDialog('Success', 'Rental Amount Updated!', 'success');
              this.bike!.rentalAmount = rentalAmount; // Update the local bike object
            }, error => {
              this.openAlertDialog('Error', 'Error updating rental amount: ' + error.message, 'error');
            });
          }
          else {
            this.openAlertDialog('Error', 'Invalid amount entered.', 'error');
          }
        }
      });
    }
  }
  updateBikeCountDialog(): void {
    if (this.bike) {
      const dialogRef = this.dialog.open(GeneralAlertDialogComponent, {
        data: {
          title: 'Update Bike Count',
          message: 'Please enter the new bike count:',
          prompt: true,
          userInput: this.bike.bikeCount.toString()
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          const bikeCount = parseFloat(result);
          if (!isNaN(bikeCount) && bikeCount >= 0) { //count validity
            this.bikeService.updateBikeCount(this.bike!.bikeId, bikeCount).subscribe(() => {
              this.openAlertDialog('Success', 'Bike Count Updated!', 'success');
              this.bike!.bikeCount = bikeCount; // Update the local bike object
            }, error => {
              this.openAlertDialog('Error', 'Error updating bike count: ' + error.message, 'error');
            });
          } else {
            this.openAlertDialog('Error', 'Invalid count entered. Please enter a non-negative number.', 'error');
          }
        }
      });
    }
  }

  returnBike(): void {
    if (this.bike && this.bike.status === '0') { 

      const storedCustName = localStorage.getItem(`bike_${this.bike.bikeId}_custName`);
      const storedCustPhNo = localStorage.getItem(`bike_${this.bike.bikeId}_custPhNo`);

      if (!storedCustName || !storedCustPhNo) {
        alert('No customer information found for this bike. Please rent the bike first.');
        return;
      }
      const returnRequest: ReturnRequestModel = {
        bikeId: this.bike.bikeId,
        custName: storedCustName,
        custPhNo: storedCustPhNo
      };

      this.rentalService.returnBike(returnRequest).subscribe({
        next: (response: any) => { // Assuming response contains the cost
          this.bike!.status = '1'; // Update the status in the UI
          this.rentalCost = response; // Set the returned cost

          this.openAlertDialog('Success', `Bike returned successfully! Cost: ${this.rentalCost}`, 'success');

          localStorage.removeItem(`bike_${this.bike!.bikeId}_custName`);
          localStorage.removeItem(`bike_${this.bike!.bikeId}_custPhNo`);
        },
        error: (error) => {
          console.error('Error returning the bike:', error);
          alert('Failed to return the bike.');
        }
      });
    } else {
      alert('This bike is not currently rented!');
    }
  }

  /*loadCustomerCountForBike(bikeId: number): void {
    this.rentalService.getCustomersByBike(bikeId).subscribe({
      next: (customers) => {
        this.customerCount = customers.length; // Set the customer count
        *//* console.log('Customer Count:', this.customerCount); *//*
      },
      error: (error) => {
        console.error('Error fetching customer count:', error);
      }
    });
  }*/
  getRentalHistory(): void {
    if (this.bike) {
      this.rentalService.getBikeRentalHistory(this.bike.bikeId).subscribe((rentalHistory) => {
        this.openRentalHistoryDialog(rentalHistory);
      }, error => {
        this.openAlertDialog('Error', 'Error fetching rental history: ' + error.message, 'error');
      });
    }
  }

  openAlertDialog(title: string, message: string, type: 'success' | 'error' | 'info'): void {
    this.dialog.open(GeneralAlertDialogComponent, {
      data: { title, message, type }
    });
  }
  openRentalHistoryDialog(rentalHistory: RentalHistory[]): void {
    this.dialog.open(RentalHistoryDialogComponent, {
      data: {
        title: 'Rental History',
        rentals: rentalHistory
      }
    });
  }
}
