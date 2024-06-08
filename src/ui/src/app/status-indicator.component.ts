import { Component, Input } from '@angular/core';
import { StatusValue, TestStatus } from '../interfaces';
import { ClarityIcons, infoCircleIcon, checkCircleIcon, exclamationCircleIcon, timesCircleIcon, dotCircleIcon } from '@cds/core/icon';
import { ClarityModule } from '@clr/angular';

ClarityIcons.addIcons(infoCircleIcon, checkCircleIcon, exclamationCircleIcon, timesCircleIcon, dotCircleIcon);

@Component({
  selector: 'app-status-indicator',
  standalone: true,
  imports: [ClarityModule],
  template: `
  <clr-tooltip>
    <cds-icon clrTooltipTrigger size="md" [attr.shape]="shape_name" [attr.status]="status_value"></cds-icon>
    <clr-tooltip-content [clrPosition]="'right'" [clrSize]="'sm'">
    {{ string_value }}
    </clr-tooltip-content>
  </clr-tooltip>
  `,
  styles: ``
})
export class StatusIndicatorComponent {
  @Input() status: StatusValue | TestStatus = StatusValue.UNKNOWN

  get string_value(): string {
    if (typeof this.status === 'string') {
      return this.status
    }
    if (typeof this.status === 'number') {
      return TestStatus[this.status]
    }
    return "UNKNOWN"
  }

  get status_value(): string {
    switch (this.status) {
      case StatusValue.HEALTHY:
        return 'success'
      case StatusValue.INFO:
        return 'info'
      case StatusValue.WARNING:
        return 'warning'
      case StatusValue.ERROR:
        return 'danger'
      case TestStatus.SUCCESS:
        return 'success'
      case TestStatus.PENDING:
        return 'info'
      case TestStatus.KNOCKING:
        return 'info'
      case TestStatus.CHECKING:
        return 'info'
      case TestStatus.FAILURE:
        return 'danger'
      case TestStatus.ERROR:
        return 'warning'
      default:
        return ''
    }
  }

  get shape_name(): string {
    switch (this.status) {
      case StatusValue.HEALTHY:
        return 'check-circle'
      case StatusValue.INFO:
        return 'info-circle'
      case StatusValue.WARNING:
        return 'exclamation-circle'
      case StatusValue.ERROR:
        return 'times-circle'
      case TestStatus.SUCCESS:
        return 'check-circle'
      case TestStatus.PENDING:
        return 'dot-circle'
      case TestStatus.KNOCKING:
        return 'dot-circle'
      case TestStatus.CHECKING:
        return 'dot-circle'
      case TestStatus.FAILURE:
        return 'times-circle'
      case TestStatus.ERROR:
        return 'exclamation-circle'
      default:
        return 'dot-circle'
    }
  }
}
