/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Test } from '../../models/test';

export interface ListTestsApiV1TestsGet$Params {
}

export function listTestsApiV1TestsGet(http: HttpClient, rootUrl: string, params?: ListTestsApiV1TestsGet$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Test>>> {
  const rb = new RequestBuilder(rootUrl, listTestsApiV1TestsGet.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<Test>>;
    })
  );
}

listTestsApiV1TestsGet.PATH = '/api/v1/tests';
