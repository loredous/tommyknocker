/* tslint:disable */
/* eslint-disable */
import { TestStatus } from '../models/test-status';
export interface Test {
  component_status_ids?: Array<string>;
  configuration_id: string;
  ended?: (string | null);
  id?: string;
  knocker_id: string;
  started?: (string | null);
  status?: TestStatus;
}
