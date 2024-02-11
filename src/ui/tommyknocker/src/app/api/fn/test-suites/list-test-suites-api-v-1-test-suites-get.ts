/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { TestSuite } from '../../models/test-suite';

export interface ListTestSuitesApiV1TestSuitesGet$Params {
}

export function listTestSuitesApiV1TestSuitesGet(http: HttpClient, rootUrl: string, params?: ListTestSuitesApiV1TestSuitesGet$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<TestSuite>>> {
  const rb = new RequestBuilder(rootUrl, listTestSuitesApiV1TestSuitesGet.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<TestSuite>>;
    })
  );
}

listTestSuitesApiV1TestSuitesGet.PATH = '/api/v1/test-suites';
