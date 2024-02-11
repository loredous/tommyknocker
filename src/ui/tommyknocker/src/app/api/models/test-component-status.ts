/* tslint:disable */
/* eslint-disable */
import { ComponentStatus } from '../models/component-status';
import { ComponentType } from '../models/component-type';
export interface TestComponentStatus {
  component_id: string;
  component_type: ComponentType;
  id?: string;
  status: ComponentStatus;
  updated?: (string | null);
}
