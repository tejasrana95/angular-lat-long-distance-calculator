import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GlobalConstants } from 'src/global/global-const';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  filterForm: FormGroup;
  @Output() updateCustomer = new EventEmitter<any>();
  constructor(private formBuilder: FormBuilder) { }

  @Input()
  set initialFilter(event) {
    if (event) {
      this.onSubmit();
    }
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.filterForm = this.formBuilder.group({
      lat: [GlobalConstants.defaultLat, [Validators.required, Validators.min(-90), Validators.max(90)]],
      long: [GlobalConstants.defaultLong, [Validators.required, Validators.min(-180), Validators.max(180)]],
      distance: [GlobalConstants.defaultRange, [Validators.required, Validators.min(0)]]
    });
  }

  onSubmit() {
    this.updateCustomer.emit(this.filterForm.getRawValue());
  }
}
