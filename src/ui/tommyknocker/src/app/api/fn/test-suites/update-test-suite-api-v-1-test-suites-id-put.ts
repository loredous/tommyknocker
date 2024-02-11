/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { TestSuite } from '../../models/test-suite';
import { UpdatedTestSuite } from '../../models/updated-test-suite';

export interface UpdateTestSuiteApiV1TestSuitesIdPut$Params {
  id: string;
      body: UpdatedTestSuite
}

export function updateTestSuiteApiV1TestSuitesIdPut(http: HttpClient, rootUrl: string, params: UpdateTestSuiteApiV1TestSuitesIdPut$Params, context?: HttpContext): Observable<StrictHttpResponse<TestSuite>> {
  const rb = new RequestBuilder(rootUrl, updateTestSuiteApiV1TestSuitesIdPut.PATH, 'put');
  if (params) {
    rb.path('id', params.id, {});
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

updateTestSuiteApiV1TestSuitesIdPut.PATH = '/api/v1/test-suites/{id}';
