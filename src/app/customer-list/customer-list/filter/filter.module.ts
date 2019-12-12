import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterComponent } from './filter/filter.component';
import { MatInputModule, MatButtonModule, MatDividerModule, MatFormFieldModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [FilterComponent],
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatFormFieldModule,
    FormsModule, ReactiveFormsModule,
    FlexLayoutModule
  ],
  exports: [FilterComponent]
})
export class FilterModule { }
