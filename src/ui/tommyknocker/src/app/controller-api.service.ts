import { Injectable, inject } from '@angular/core';
import { Teststatus } from './teststatus';
import { TestsService } from './api/services';

@Injectable({
  providedIn: 'root'
})
export class ControllerApiService {
  tests_service = inject(TestsService);

  constructor() { }

  async getDashboardData(): Promise<Teststatus[]> {
    let saturated_tests: Teststatus[] = [];
    this.tests_service.listTestsApiV1TestsGet().forEach(test => {
      let test_status: Teststatus = {
        name: '',
        knocker: '',
        started: '',
        ended: '',
        status: '',
      };
      saturated_tests.push(test_status);
    });
      
    return saturated_tests;
  }
}
