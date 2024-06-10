import { Component, EventEmitter, Injector, Input, OnChanges, Output, SimpleChanges, Type } from '@angular/core';
import { ICrudApiService } from '../../tommyknocker-api.service';
import { FormsModule } from '@angular/forms';
import { ClrComboboxModule } from '@clr/angular';



@Component({
  selector: 'app-lookup-display',
  standalone: true,
  imports: [],
  template: `
    {{name_value}}
  `,
  styles: ``
})
export class LookupDisplayComponent implements OnChanges {
  @Input({required: true}) object_id!: string | string[];
  @Input({required: true}) API!: Type<ICrudApiService<any>>;
  @Input() value_field: string = 'name';
  name_value: string = '';

  constructor(private injector: Injector) {}

   ngOnChanges(changes: SimpleChanges): void {
    if (changes['object_id']) {
      let api_service = this.injector.get<ICrudApiService<any>>(this.API);
      if (Array.isArray(this.object_id)) {
        this.object_id.forEach((id: string) => {
          api_service.getItem(id).subscribe((data: any) => {
            this.name_value += data[this.value_field] + ', ';
          });
        }
      )} else {
        api_service.getItem(this.object_id).subscribe((data: any) => {
          this.name_value = data[this.value_field];
        });
      }
    }
   }
}

import { NgFor } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lookup-input',
  standalone: true,
  imports: [NgFor,FormsModule, CommonModule],
  template: `
    <select clrSelect name="options" (change)="onChange($event)">
    <ng-container *ngFor="let val of values">
    <option value="val[0]">{{val[1]}}</option>
    </ng-container>
    </select> 
  `,
  styles: ``
})
export class LookupInputComponent implements OnChanges {
  @Input({required: true}) API!: Type<ICrudApiService<any>>;
  @Output() selectedOption = new EventEmitter<string>();
  @Input() value_field: string = 'name';

  values: [string,string][] = [];
  selected_id: string = '';
  

  constructor(private injector: Injector) {
  }

  onChange(value: any) {
    this.selected_id = value.target.value;
    this.selectedOption.emit(this.selected_id);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['API']) {
      let api_service = this.injector.get<ICrudApiService<any>>(this.API);
      api_service.getItems().subscribe((data: any) => {
        data.forEach((item: any) => {
          this.values.push([item['id'], item[this.value_field]]);
        });
      });
  }

}
}

@Component({
  selector: 'app-lookup-multiinput',
  standalone: true,
  imports: [NgFor,FormsModule, CommonModule, ClrComboboxModule],
  template: `
    <clr-combobox-container>
      <clr-combobox name="options" (change)="onChange($event)" clrMulti="true">
        <clr-options>
          <clr-option *clrOptionItems="let val of values; field: 'id'" [clrValue]="selected_id">
            {{val[value_field]}}
          </clr-option>
        </clr-options>
      </clr-combobox>
      <clr-control-helper>Helper text</clr-control-helper>
      <clr-control-error>There was an error</clr-control-error>
    </clr-combobox-container>
  `,
  styles: ``
})
export class LookupMultiInputComponent implements OnChanges {
  @Input({required: true}) API!: Type<ICrudApiService<any>>;
  @Output() selectedOption = new EventEmitter<string>();
  @Input() value_field: string = 'name';

  values: any[] = [];
  selected_id: string = '';

  constructor(private injector: Injector) {
  }

  onChange(value: any) {
    this.selected_id = value.target.value;
    this.selectedOption.emit(this.selected_id);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['API']) {
      let api_service = this.injector.get<ICrudApiService<any>>(this.API);
      api_service.getItems().subscribe((data: any) => {
        data.forEach((item: any) => {
          this.values.push(item);
        });
      });
  }

}
}