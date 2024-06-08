import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { TestSuite, TestStatus, TestConfiguration, StatusData, StatusValue, Test, TestSuiteStatus, TestConfigurationStatus } from '../../interfaces';
import { NgFor } from '@angular/common';
import { StatusIndicatorComponent } from '../status-indicator.component';
import { TestConfigurationAPIService, TestSuiteAPIService } from '../../tommyknocker-api.service';
import { BehaviorSubject, timeout } from 'rxjs';






@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ClarityModule, StatusIndicatorComponent,NgFor],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  _status = new BehaviorSubject<StatusData>({ test_suites: [] as TestSuiteStatus[], uncategorized_tests: { suite: {} as TestSuite, status: StatusValue.UNKNOWN, test_configs: [] as TestConfigurationStatus[] } as TestSuiteStatus } as StatusData);
  overall_status: StatusValue = StatusValue.UNKNOWN;

  get status() {
    return this._status.value;
  }
  
  constructor(
    private testconfigurationAPIService: TestConfigurationAPIService<TestConfiguration>,
    private testSuiteAPIService: TestSuiteAPIService<TestSuite>,
  ) { }

  ngOnInit(): void {
    this._status.subscribe((status: StatusData) => {this.overall_status = this.getOverallStatus(status);});
    this.refreshStatusData();

  }

  refreshStatusData(): void {
    this._status.next({
      overall_status: StatusValue.UNKNOWN,
      test_suites: [] as TestSuiteStatus[],
      uncategorized_tests: {} as TestSuiteStatus
    } as StatusData);
    this.refreshTestSuites();
    this.refreshUncategorizedTests();
  }

  refreshUncategorizedTests(): void {
    let uncat: TestSuiteStatus = { suite: {} as TestSuite, status: StatusValue.UNKNOWN, test_configs: [] as TestConfigurationStatus[] } as TestSuiteStatus;
    this.testSuiteAPIService.getUncategorizedTestConfigurations().subscribe((testConfigs: TestConfiguration[]) => {
      testConfigs.forEach((testConfig: TestConfiguration) => {
        this.testconfigurationAPIService.getRecentTestsByConfiguration(testConfig.id).subscribe((tests: Test[]) => {
          uncat.test_configs.push({
            config: testConfig,
            status: this.getTestConfigurationStatusFromTests(tests),
            runs: tests
          } as TestConfigurationStatus);
          uncat.status = this.getSuiteStatusFromTestConfigurations(uncat.test_configs);
          let new_status = this._status.value;
          new_status.uncategorized_tests = uncat;
          this._status.next(new_status);
        });
      });
    });
  }

  refreshTestSuites(): void {
    let test_suite_statuses = [] as TestSuiteStatus[];
    this.testSuiteAPIService.getItems().subscribe((testSuites: TestSuite[]) => {
      testSuites.forEach((testSuite: TestSuite) => {
        let suiteStatus = {
          suite: testSuite,
          status: StatusValue.UNKNOWN,
          test_configs: []
        } as TestSuiteStatus;
        this.testSuiteAPIService.getTestConfigurationsInSuite(testSuite.id).subscribe((testConfigs: TestConfiguration[]) => {
          testConfigs.forEach((testConfig: TestConfiguration) => {
            this.testconfigurationAPIService.getRecentTestsByConfiguration(testConfig.id).subscribe((tests: Test[]) => {
              suiteStatus.test_configs.push({
                config: testConfig,
                status: this.getTestConfigurationStatusFromTests(tests),
                runs: tests
              } as TestConfigurationStatus);
          });
        });
        suiteStatus.status = this.getSuiteStatusFromTestConfigurations(suiteStatus.test_configs);
        test_suite_statuses.push(suiteStatus);
      });
    });
    let new_status = this._status.value;
    new_status.test_suites = test_suite_statuses;
    this._status.next(new_status);
  });
}

getTestConfigurationStatusFromTests(tests: Test[]): StatusValue {
  if (tests.length === 0) {
    return StatusValue.UNKNOWN;
  }
  switch (tests[0].status) {
    case TestStatus.SUCCESS:
      return StatusValue.HEALTHY;
    case TestStatus.FAILURE:
      return StatusValue.WARNING;
    case TestStatus.ERROR:
      return StatusValue.ERROR;
    default:
      return StatusValue.UNKNOWN;
  }
}

getSuiteStatusFromTestConfigurations(testConfigs: TestConfigurationStatus[]): StatusValue {
  if (testConfigs.length === 0) {
    return StatusValue.UNKNOWN;
  }
  if (testConfigs.every((testConfig: TestConfigurationStatus) => testConfig.status === StatusValue.HEALTHY)) {
    return StatusValue.HEALTHY;
  }
  if (testConfigs.some((testConfig: TestConfigurationStatus) => testConfig.status === StatusValue.ERROR)) {
    return StatusValue.ERROR;
  }
  if (testConfigs.some((testConfig: TestConfigurationStatus) => testConfig.status === StatusValue.WARNING)) {
    return StatusValue.WARNING;
  }
  return StatusValue.UNKNOWN;
}

getOverallStatus(data: StatusData): StatusValue {
  if (data.test_suites.every((suite: TestSuiteStatus) => suite.status === StatusValue.HEALTHY) && data.uncategorized_tests.status === StatusValue.HEALTHY) {
    return StatusValue.HEALTHY;
  }
  if (data.test_suites.some((suite: TestSuiteStatus) => suite.status === StatusValue.ERROR) || data.uncategorized_tests.status === StatusValue.ERROR) {
    return StatusValue.ERROR;
  }
  return StatusValue.UNKNOWN;
}
  


}
