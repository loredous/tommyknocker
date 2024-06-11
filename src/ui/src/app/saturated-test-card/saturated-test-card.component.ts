import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SaturatedTest } from '../../interfaces';
import { DatePipe, JsonPipe } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { NgIf, NgFor } from '@angular/common';
import { TestStatus } from '../../interfaces';

@Component({
  selector: 'saturated-test-card',
  standalone: true,
  imports: [DatePipe, JsonPipe, ClarityModule, NgIf, NgFor],
  templateUrl: './saturated-test-card.component.html',
  styles: ``
})
export class SaturatedTestCardComponent {
  @Input() test_data: SaturatedTest = {} as SaturatedTest;
  @Output() delete = new EventEmitter<string>();

  public get TestStatus() {
    return TestStatus;
  }

  onDelete() {
    this.delete.emit(this.test_data.test.id);
  }
}
