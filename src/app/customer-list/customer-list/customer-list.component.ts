import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { CustomerService } from '../customer.service';
import { Subscription, of } from 'rxjs';
import { CustomerModel } from '../customer.model';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit, OnDestroy {

  customerSubscription: Subscription; // initiated customer subscription so that we can control the api call.
  customersData: CustomerModel[] = []; // Customer data will stored here with proper JSON formatted.
  filteredData: CustomerModel[] = []; // Filtered data will be stored where based on customer data.
  initialFilter = false; // will trigger the initial filter so that customer will be shown with predefine filters.
  displayedColumns: string[] = ['user_id', 'name', 'latitude', 'longitude', 'distance']; // define the columns

  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    // initiate the get customer. so that we can format the customer.txt into proper json.
    this.getCustomers();
  }
  /**
   * getCustomer()
   * this function will be used to read the customer.txt file. and read the file line by line and push it to global customersData.
   */
  getCustomers() {
    this.customerSubscription = this.customerService.loadCustomers().subscribe(data => {
      const lines = data.split('\n');
      lines.forEach(line => {
        this.customersData.push(JSON.parse(line));
      });
      this.initialFilter = true;
    }, err => {
      console.error(err);
    });
  }

  /**
   * updateFilter()
   * @param formData
   * this function will be used to read the customer.txt file. and read the file line by line and push it to global customersData.
   * FormData will be lat, long and distance
   */
  updateFilter(formData) {
    this.filteredData = [];
    this.customersData.forEach(data => {
      const distance = this.distanceCalculator(formData.lat, formData.long, data.latitude, data.longitude);
      data.distance = distance;
      if (distance <= formData.distance) {
        this.filteredData.push(data);
      }
    });

    this.sortFilterData();
  }

  /**
   * ascending sorting
   */
  sortFilterData() {
    this.filteredData.sort((obj1, obj2) => {
      return obj1.user_id - obj2.user_id;
    });
  }

  /**
   * distanceCalculator()
   * @param fromLat 
   * @param fromLong 
   * @param toLat 
   * @param toLong 
   * 
   * this algorithm will be calculate the distance from the origin or from lat long to custom's lat long.
   */
  distanceCalculator(fromLat, fromLong, toLat, toLong) {

    const radiusOfEarth = 6371;
    const distanceLat = this.degreeToRadiusCalculator(toLat - fromLat);
    const distanceLong = this.degreeToRadiusCalculator(toLong - fromLong);
    const outputOfAlgo =
      Math.sin(distanceLat / 2) * Math.sin(distanceLat / 2) +
      Math.cos(this.degreeToRadiusCalculator(fromLat)) * Math.cos(this.degreeToRadiusCalculator(toLat)) *
      Math.sin(distanceLong / 2) * Math.sin(distanceLong / 2);
    const circular = 2 * Math.atan2(Math.sqrt(outputOfAlgo), Math.sqrt(1 - outputOfAlgo));
    const distance = radiusOfEarth * circular;
    return distance;
  }

  /**
   * degreeToRadiusCalculator
   * @param deg 
   * this function will simple convert the degree to radius.
   */
  degreeToRadiusCalculator(deg) {
    return deg * (Math.PI / 180);
  }

  /**
   * ngOnDestroy
   * this function will simply destory the subscription whenever the user move to any other route.
   */
  ngOnDestroy() {
    this.customerSubscription.unsubscribe();
  }
}
