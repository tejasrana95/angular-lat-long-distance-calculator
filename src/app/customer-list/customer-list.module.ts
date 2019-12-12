import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerService } from './customer.service';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FilterModule } from './customer-list/filter/filter.module';
import { MatTableModule } from '@angular/material/table';
import { CdkTableModule } from '@angular/cdk/table';
import { FlexLayoutModule } from '@angular/flex-layout';

const appRoutes: Routes = [
  {
    path: '**',
    component: CustomerListComponent
  }
];

@NgModule({
  declarations: [CustomerListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(appRoutes),
    HttpClientModule,
    FilterModule,
    MatTableModule,
    CdkTableModule,
    FlexLayoutModule
  ],
  providers: [CustomerService]
})
export class CustomerListModule { }
