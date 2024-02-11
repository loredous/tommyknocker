/* tslint:disable */
/* eslint-disable */
import { MonitorType } from '../models/monitor-type';
export interface NewMonitor {
  description: (string | null);
  name: string;
  type: MonitorType;
}
