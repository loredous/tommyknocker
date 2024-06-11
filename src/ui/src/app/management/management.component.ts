import { Component, Injector, OnInit, Type, ViewChild } from '@angular/core';
import { ICrudApiService, KnockAPIService, KnockerAPIService, MonitorAPIService, ResponseAPIService, ResponseExpectationAPIService, ResultAPIService, RunnerAPIService, TestConfigurationAPIService, TestSuiteAPIService } from '../../tommyknocker-api.service';
import { NgFor, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { ClarityModule } from "@clr/angular";
import { FormsModule } from '@angular/forms';
import {Clipboard} from '@angular/cdk/clipboard';
import { ActivatedRoute, Router } from '@angular/router';
import { ClrDatagrid } from '@clr/angular';
import { KvDisplayComponent, KvInputComponent } from './kv-handling.component';
import { LookupDisplayComponent, LookupInputComponent, LookupMultiInputComponent } from './lookup-handling.component';

enum InputType {
  Input,
  TextArea,
  KeyValue,
  Lookup,
  MultiLookup
}

interface IColumn {
  name: string,
  title: string,
  input_type: InputType,
  required?: boolean,
  updateable?: boolean,
  createable?: boolean,
  placeholder?: string,
  copyable?: boolean,
  lookup_interface?: Type<ICrudApiService<any>>
  value_field?: string
}

interface IManagementType {
  name: string,
  description: string,
  columns: IColumn[]
  service: Type<ICrudApiService<any>>
  empty_item: any
}

const management_types: {[id: string]: IManagementType} = {
  knockers: {
    name: 'Knocker',
    description: 'Knockers are the service components that are responsible for managing and initiating the knock process.',
    columns: [
      { name: 'id', title: 'ID', input_type: InputType.Input, copyable: true},
      { name: 'name', title: 'Name', required: true, input_type: InputType.Input, updateable: true, placeholder: 'Name', createable: true},
      { name: 'description', title: 'Description', input_type: InputType.TextArea, required: false, updateable: true, placeholder: 'Description', createable: true},
      { name: 'last_seen', title: 'Last Seen', input_type: InputType.Input}
    ],
    service: KnockerAPIService,
    empty_item: { id: '', name: '', description: '', last_seen: new Date() }
  },
  runners: {
    name: 'Runner',
    description: 'Runners identify a specific docker image and tag that should be used to run a given knock',
    columns: [
      { name: 'id', title: 'ID', input_type: InputType.Input, copyable: true},
      { name: 'name', title: 'Name', required: true, input_type: InputType.Input, updateable: true, placeholder: 'Name', createable: true},
      { name: 'description', title: 'Description', input_type: InputType.TextArea, required: false, updateable: true, placeholder: 'Description', createable: true},
      { name: 'image_name', title: 'Image Name', required: true, input_type: InputType.Input, updateable: true, placeholder: 'Image Name', createable: true},
      { name: 'image_tag', title: 'Image Tag', required: true, input_type: InputType.Input, updateable: true, placeholder: 'Image Tag', createable: true}
    ],
    service: RunnerAPIService,
    empty_item: { id: '', name: '', description: '', image_name: '', image_tag: '' }
  },
  monitors: {
    name: 'Monitor',
    description: 'Monitors are the service components that are responsible for monitoring the status of the knock process.',
    columns: [
      { name: 'id', title: 'ID', input_type: InputType.Input, copyable: true},
      { name: 'name', title: 'Name', required: true, input_type: InputType.Input, updateable: true, placeholder: 'Name', createable: true},
      { name: 'description', title: 'Description', input_type: InputType.TextArea, required: false, updateable: true, placeholder: 'Description', createable: true},
      { name: 'type', title: 'Type', required: true, input_type: InputType.Input, updateable: true, placeholder: 'Type', createable: true},
      { name: 'config', title: 'Config', input_type: InputType.KeyValue, required: false, updateable: true, placeholder: 'Config', createable: true}
    ],
    service: MonitorAPIService,
    empty_item: { id: '', name: '', description: '', type: '', config: {} }
  },
  responses: {
    name: 'Response',
    description: 'A response defines an expected data point that should be raised when a knock occurs.',
    columns: [
      { name: 'id', title: 'ID', input_type: InputType.Input, copyable: true},
      { name: 'name', title: 'Name', required: true, input_type: InputType.Input, updateable: true, placeholder: 'Name', createable: true},
      { name: 'description', title: 'Description', input_type: InputType.TextArea, required: false, updateable: true, placeholder: 'Description', createable: true},
      { name: 'monitor_id', title: 'Monitor', required: true, input_type: InputType.Lookup, lookup_interface: MonitorAPIService, updateable: true, placeholder: 'Monitor ID', createable: true},
      { name: 'monitor_parameters', title: 'Monitor Parameters', input_type: InputType.KeyValue, required: false, updateable: true, placeholder: 'Monitor Parameters', createable: true}
    ],
    service: ResponseAPIService,
    empty_item: { id: '', name: '', description: '', monitor_id: '', monitor_parameters: new Map<string, string>()}
  },
  knocks: {
    name: 'Knock',
    description: 'Knocks are the service components that are responsible for managing the knock process.',
    columns: [
      { name: 'name', title: 'Name', required: true, input_type: InputType.Input, updateable: true, placeholder: 'Name', createable: true},
      { name: 'id', title: 'ID', input_type: InputType.Input, copyable: true},
      { name: 'runner_id', title: 'Runner', required: true, input_type: InputType.Lookup,lookup_interface: RunnerAPIService, updateable: true, placeholder: 'Runner ID', createable: true},
      { name: 'command', title: 'Command', required: true, input_type: InputType.Input, updateable: true, placeholder: 'Command', createable: true},
      { name: 'description', title: 'Description', input_type: InputType.TextArea, required: false, updateable: true, placeholder: 'Description', createable: true},
      { name: 'result_ids', title: 'Result IDs', input_type: InputType.MultiLookup, lookup_interface:ResultAPIService, value_field: 'id', required: false, updateable: true, placeholder: 'Result IDs', createable: true}
    ],
    service: KnockAPIService,
    empty_item: { id: '', runner_id: '', command: '', description: '', result_ids: [] }
  },
  results: {
    name: 'Result',
    description: 'Results are the service components that are responsible for managing the result process.',
    columns: [
      { name: 'id', title: 'ID', input_type: InputType.Input, copyable: true},
      { name: 'type', title: 'Type', required: true, input_type: InputType.Input, updateable: true, placeholder: 'Type', createable: true},
      { name: 'value', title: 'Value', required: true, input_type: InputType.Input, updateable: true, placeholder: 'Value', createable: true}
    ],
    service: ResultAPIService,
    empty_item: { id: '', type: '', value: '' }
  },
  test_configurations: {
    name: 'Test Configuration',
    description: 'Test Configurations are the service components that are responsible for managing the test configuration process.',
    columns: [
      { name: 'id', title: 'ID', input_type: InputType.Input, copyable: true},
      { name: 'name', title: 'Name', required: true, input_type: InputType.Input, updateable: true, placeholder: 'Name', createable: true},
      { name: 'description', title: 'Description', input_type: InputType.TextArea, required: false, updateable: true, placeholder: 'Description', createable: true},
      { name: 'knock_ids', title: 'Knocks', input_type: InputType.Lookup, lookup_interface: KnockAPIService, required: false, updateable: true, placeholder: 'Knock IDs', createable: true},
      { name: 'response_expectation_ids', title: 'Response Expectation IDs', input_type: InputType.TextArea, required: false, updateable: true, placeholder: 'Response Expectation IDs', createable: true}
    ],
    service: TestConfigurationAPIService,
    empty_item: { id: '', name: '', description: '', knock_ids: [] }
  },
  test_suites: {
    name: 'Test Suite',
    description: 'Test Suites are the service components that are responsible for managing the test suite process.',
    columns: [
      { name: 'id', title: 'ID', input_type: InputType.Input, copyable: true},
      { name: 'name', title: 'Name', required: true, input_type: InputType.Input, updateable: true, placeholder: 'Name', createable: true},
      { name: 'description', title: 'Description', input_type: InputType.TextArea, required: false, updateable: true, placeholder: 'Description', createable: true},
      { name: 'test_configuration_ids', title: 'Test Configurations', input_type: InputType.Lookup, lookup_interface: TestConfigurationAPIService, required: false, updateable: true, placeholder: 'Test Configuration IDs', createable: true}
    ],
    service: TestSuiteAPIService,
    empty_item: { id: '', configuration_id: '' }
  },
  response_expectations: {
    name: 'Response Expectation',
    description: 'Response expectations dictate if a response is expected or not, and the timeout allowed for that response to occur.',
    columns: [
      { name: 'id', title: 'ID', input_type: InputType.Input, copyable: true},
      { name: 'response_id', title: "Response", input_type: InputType.Lookup, lookup_interface: ResponseAPIService, createable: true, updateable: true},
      { name: 'expected', title: "Expected", input_type: InputType.Input, createable: true, updateable: true},
      { name: 'timeout', title: "Timeout", input_type: InputType.Input, createable: true, updateable: true}
    ],
    service: ResponseExpectationAPIService,
    empty_item: {id: '', response_id: '', expected: true, timeout: 60}
  }
};

@Component({
  selector: 'app-monitor-management',
  standalone: true,
  imports: [NgFor, ClarityModule, FormsModule, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault, KvDisplayComponent, KvInputComponent, LookupDisplayComponent, LookupInputComponent, LookupMultiInputComponent],
  templateUrl: './management.component.html',
  styleUrl: './management.component.css'
})

export class ManagementComponent {
  items: any[] = [];
  active_item: any = null;
  edit_opened: boolean = false;
  create_opened: boolean = false;
  interval: any;
  management_type!: IManagementType;
  api!: ICrudApiService<any>;


  constructor(private clipboard: Clipboard, private route: ActivatedRoute, private injector: Injector, private router: Router) {
    this.route.params.subscribe(params => {
      if (!(params['type'] in management_types)) {
        this.router.navigate(['/']);
        throw new Error(`Invalid management type: ${params['type']}`);
      }
      this.management_type = management_types[params['type']];
      this.api = injector.get<ICrudApiService<any>>(this.management_type.service);
      this.active_item = this.management_type.empty_item;
      this.refreshData();
    });

  }

  public get InputType() {
    return InputType;
  }

  ngOnInit() {
    this.refreshData();
    this.interval = setInterval(() => { 
      this.refreshData(); 
    }, 30000);
  }

  @ViewChild(ClrDatagrid) dg?: ClrDatagrid;
  refreshData() {
    this.api.getItems().subscribe(items => {
      this.items = items;
      setTimeout(() => this.dg?.resize());
    });
  }

  onDelete(item: any) {
    this.api.deleteItem(item.id).subscribe(() => {
      this.refreshData();
    });
  }

  onEdit(item: any) {
    this.active_item = structuredClone(item);
    this.edit_opened = true;
  }

  editCancelled() {
    this.edit_opened = false;
    this.active_item = this.management_type.empty_item;
    this.refreshData();
  }

  editSubmitted() {
    this.api.updateItem(this.active_item.id, this.active_item).subscribe(() => {
      this.edit_opened = false;
      this.active_item = this.management_type.empty_item;
      this.refreshData();
    });
  }

  onCreate() {
    this.active_item = this.management_type.empty_item;
    this.create_opened = true;
  }

  createCancelled() {
    this.create_opened = false;
    this.active_item = this.management_type.empty_item;
    this.refreshData();
  }

  createSubmitted() {
    this.api.createItem(this.active_item).subscribe(() => {
      this.create_opened = false;
      this.active_item = this.management_type.empty_item;
      this.refreshData();
    });
  }

  onCopy(item: any, attribute: string) {
    this.clipboard.copy(item[attribute]);
  }
}

