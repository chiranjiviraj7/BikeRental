import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { BikeDetailsComponent } from './components/bike-details/bike-details.component';
import { AddBikeComponent } from './components/add-bike/add-bike.component';
import { FormsModule } from '@angular/forms';
import { BikeRentComponent } from './components/bike-rent/bike-rent.component';
import { AddCustomerComponent } from './components/add-customer/add-customer.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { GeneralAlertDialogComponent } from './components/general-alert-dialog/general-alert-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { RentalHistoryDialogComponent } from './components/rental-history-dialog/rental-history-dialog.component';
import { MatTableModule } from '@angular/material/table';
import { ReturnBikeComponent } from './components/return-bike/return-bike.component';
import { RouterModule } from '@angular/router';
import { MatBadgeModule } from '@angular/material/badge';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { MatMenuModule } from '@angular/material/menu';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BikeDetailsComponent,
    AddBikeComponent,
    BikeRentComponent,
    AddCustomerComponent,
    GeneralAlertDialogComponent,
    RentalHistoryDialogComponent,
    ReturnBikeComponent,
  ],
  imports: [
    BrowserModule,
    MatSelectModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatMenuModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatCardModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatIconModule,
    MatDividerModule,
    ReactiveFormsModule,
    MatDialogModule,
    RouterModule,
    MatBadgeModule,
    MatAutocompleteModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
