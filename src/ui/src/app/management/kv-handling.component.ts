import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { NgIf, NgFor, KeyValuePipe } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { ClarityIcons, pencilIcon, timesIcon, plusCircleIcon } from '@cds/core/icon';
import { FormsModule } from '@angular/forms';

ClarityIcons.addIcons(pencilIcon, timesIcon, plusCircleIcon);

@Component({
  selector: 'app-kv-input',
  standalone: true,
  imports: [NgIf, NgFor, ClarityModule, KeyValuePipe, FormsModule],
  providers: [KeyValuePipe],
  template: `
    <p *ngIf="label != ''" class="clr-control-label">{{label}}</p>
    <div *ngFor="let item of value | keyvalue">
      <span class="label clickable"><div cds-text="secondary medium">{{item.key}}</div> = <div cds-text="secondary">{{item.value}}</div>
      <cds-icon shape="times" size="16" (click)="delete(item)"></cds-icon></span><br>
    </div>
    <input clrInput placeholder="key" name="key_input" [(ngModel)]="new_key" /> = <input clrInput placeholder="value" name="value" [(ngModel)]="new_value" /><cds-icon shape="plus-circle" size="24" (click)="add()"></cds-icon>
  `,
  styles: ``
})
export class KvInputComponent {
  @Input({required: true}) value!: { [key: string]: string | number | boolean};
  @Input() label: string = '';
  @Output() valueChanged = new EventEmitter<{ [key: string]: string | number | boolean}>();

  new_key = '';
  new_value = '';

  constructor(private cdRef: ChangeDetectorRef) {  }

  add() {
    this.value[this.new_key] = this.new_value;
    this.new_key = '';
    this.new_value = '';
    this.valueChanged.emit(this.value);
    this.cdRef.detectChanges();
  }

  delete(item: {key: string, value: string | number | boolean}) {
    delete this.value[item.key]
    this.valueChanged.emit(this.value);
    this.cdRef.detectChanges();
  }
}

@Component({
  selector: 'app-kv-display',
  standalone: true,
  imports: [NgIf, NgFor, KeyValuePipe],
  providers: [KeyValuePipe],
  template: `
    <div *ngFor="let item of value | keyvalue">
      <span class="label"><p cds-text="secondary medium">{{item.key}}</p> = <p cds-text="secondary">{{item.value}}</p></span>
    </div>
  `,
  styles: ``
})
export class KvDisplayComponent {
  @Input({required: true}) value!: { [key: string]: string | number | boolean};

  constructor() { }
}
