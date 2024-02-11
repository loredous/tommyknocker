/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { NewTestComponentStatus } from '../../models/new-test-component-status';
import { TestComponentStatus } from '../../models/test-component-status';

export interface CreateTestComponentStatusApiV1TestComponentStatusesPost$Params {
      body: NewTestComponentStatus
}

export function createTestComponentStatusApiV1TestComponentStatusesPost(http: HttpClient, rootUrl: string, params: CreateTestComponentStatusApiV1TestComponentStatusesPost$Params, context?: HttpContext): Observable<StrictHttpResponse<TestComponentStatus>> {
  const rb = new RequestBuilder(rootUrl, createTestComponentStatusApiV1TestComponentStatusesPost.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<TestComponentStatus>;
    })
  );
}

createTestComponentStatusApiV1TestComponentStatusesPost.PATH = '/api/v1/test-component-statuses';
