import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private httpClient: HttpClient) { }
  /**
   * loadCustomers
   * this service will subscribe the customer.txt file
   */
  loadCustomers() {
    return this.httpClient.get('../../assets/customers.txt', { responseType: 'text' });
  }
}
