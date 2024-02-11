/* tslint:disable */
/* eslint-disable */
import { ComponentStatus } from '../models/component-status';
import { ComponentType } from '../models/component-type';
export interface NewTestComponentStatus {
  component_id: string;
  component_type: ComponentType;
  status: ComponentStatus;
}
