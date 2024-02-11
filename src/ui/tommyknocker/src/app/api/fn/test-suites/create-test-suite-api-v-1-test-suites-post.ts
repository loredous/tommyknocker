/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { NewTestSuite } from '../../models/new-test-suite';
import { TestSuite } from '../../models/test-suite';

export interface CreateTestSuiteApiV1TestSuitesPost$Params {
      body: NewTestSuite
}

export function createTestSuiteApiV1TestSuitesPost(http: HttpClient, rootUrl: string, params: CreateTestSuiteApiV1TestSuitesPost$Params, context?: HttpContext): Observable<StrictHttpResponse<TestSuite>> {
  const rb = new RequestBuilder(rootUrl, createTestSuiteApiV1TestSuitesPost.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<TestSuite>;
    })
  );
}

createTestSuiteApiV1TestSuitesPost.PATH = '/api/v1/test-suites';
