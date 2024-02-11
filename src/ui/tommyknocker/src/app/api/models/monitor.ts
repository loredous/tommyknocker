/* tslint:disable */
/* eslint-disable */
import { MonitorType } from '../models/monitor-type';
export interface Monitor {
  description?: string;
  id?: string;
  name: string;
  type: MonitorType;
}
