/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { TestSuite } from '../../models/test-suite';

export interface GetTestSuiteByIdApiV1TestSuitesIdGet$Params {
  id: string;
}

export function getTestSuiteByIdApiV1TestSuitesIdGet(http: HttpClient, rootUrl: string, params: GetTestSuiteByIdApiV1TestSuitesIdGet$Params, context?: HttpContext): Observable<StrictHttpResponse<TestSuite>> {
  const rb = new RequestBuilder(rootUrl, getTestSuiteByIdApiV1TestSuitesIdGet.PATH, 'get');
  if (params) {
    rb.path('id', params.id, {});
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

getTestSuiteByIdApiV1TestSuitesIdGet.PATH = '/api/v1/test-suites/{id}';
