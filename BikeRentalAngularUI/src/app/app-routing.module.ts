import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BikeDetailsComponent } from './components/bike-details/bike-details.component';
import { AddBikeComponent } from './components/add-bike/add-bike.component';
import { BikeRentComponent } from './components/bike-rent/bike-rent.component';
import { AddCustomerComponent } from './components/add-customer/add-customer.component';
import { ReturnBikeComponent } from './components/return-bike/return-bike.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'bike/:id', component: BikeDetailsComponent },
  { path: 'add-bike', component: AddBikeComponent },
  { path: 'update-bike/:id', component: AddBikeComponent },
  { path: 'rent/:bikeId', component: BikeRentComponent },
  { path: 'add-customer/:bikeId', component: AddCustomerComponent },
  { path: 'add-customer', component: AddCustomerComponent },
  { path: 'return-bike/:bikeId', component: ReturnBikeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
