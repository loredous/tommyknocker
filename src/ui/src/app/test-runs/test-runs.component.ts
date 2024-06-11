import { Component, OnInit } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { TestAPIService, KnockerAPIService, TestConfigurationAPIService, TestComponentStatusAPIService } from '../../tommyknocker-api.service';
import { Knocker, SaturatedTest, Test, TestComponentStatus, TestConfiguration, TestStatus } from '../../interfaces';
import { DatePipe } from '@angular/common';
import { NgFor, NgIf } from '@angular/common';
import { SaturatedTestCardComponent } from '../saturated-test-card/saturated-test-card.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-test-runs',
  standalone: true,
  imports: [DatePipe, NgFor, SaturatedTestCardComponent, NgIf, ClarityModule, FormsModule],
  providers: [],
  templateUrl: './test-runs.component.html',
  styleUrl: './test-runs.component.css'
})
export class TestRunsComponent implements OnInit {
  pending_tests: SaturatedTest[] = [];
  running_tests: SaturatedTest[] = [];
  completed_tests: SaturatedTest[] = [];
  interval: any;
  create_opened: boolean = false;
  knocker_id = '';
  configuration_id = '';
    knockers = [] as Knocker[];
  configurations = [] as TestConfiguration[];
  
  constructor(
    private testAPIService: TestAPIService<Test>, 
    private knockerAPIService: KnockerAPIService<Knocker>, 
    private testConfigurationAPIService: TestConfigurationAPIService<TestConfiguration>,
    private testComponentStatusAPIService: TestComponentStatusAPIService<TestComponentStatus>
  ) {}

  ngOnInit() {
    this.refreshData();
    this.interval = setInterval(() => { 
      this.refreshData(); 
  }, 30000);
  }

  refreshData() {
    this.testAPIService.getTestsByStatus(TestStatus.PENDING).subscribe(tests => this.pending_tests = this.saturateTests(tests));
    this.testAPIService.getRunningTests().subscribe(tests => this.running_tests = this.saturateTests(tests));
    this.testAPIService.getCompletedTests().subscribe(tests => this.completed_tests = this.saturateTests(tests));
    };
  
  saturateTests(tests: Test[]): SaturatedTest[] {
    return tests.map(test => {
      let saturated = { test: test, knocker: '' as any , configuration: '' as any, component_statuses: [] as TestComponentStatus[]};
      this.knockerAPIService.getItem(test.knocker_id).subscribe(knocker => saturated.knocker = knocker);
      this.testConfigurationAPIService.getItem(test.configuration_id).subscribe(configuration => saturated.configuration = configuration);
      this.testComponentStatusAPIService.getTestComponentStatusByTest(test.id).subscribe(component_statuses => saturated.component_statuses = component_statuses);
      return saturated as SaturatedTest;
    });
  }

  onAddTestRun() {
    this.create_opened = true;
    this.knockerAPIService.getItems().subscribe(knockers => this.knockers = knockers);
    this.testConfigurationAPIService.getItems().subscribe(configurations => this.configurations = configurations);
  }

  onSubmitAddTestRun() {
    this.create_opened = false;
    this.testAPIService.createItem({ id: "", knocker_id: this.knocker_id, configuration_id: this.configuration_id, status: TestStatus.PENDING, started: new Date(), ended: new Date(), component_status_ids: []} as Test).subscribe(test => this.refreshData());
    this.knocker_id = '';
    this.configuration_id = '';
    this.knockers = [] as Knocker[];
    this.configurations = [] as TestConfiguration[];
  }

  onDeleteTestRun(id: string) {
    this.testAPIService.deleteItem(id).subscribe(()=> {this.refreshData();})
    
  }

  onCancelAddTestRun() {
    this.knocker_id = '';
    this.configuration_id = '';
    this.knockers = [] as Knocker[];
    this.configurations = [] as TestConfiguration[];
    this.create_opened = false;
  }

}
