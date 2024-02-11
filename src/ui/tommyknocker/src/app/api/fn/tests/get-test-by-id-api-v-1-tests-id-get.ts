/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Test } from '../../models/test';

export interface GetTestByIdApiV1TestsIdGet$Params {
  id: string;
}

export function getTestByIdApiV1TestsIdGet(http: HttpClient, rootUrl: string, params: GetTestByIdApiV1TestsIdGet$Params, context?: HttpContext): Observable<StrictHttpResponse<Test>> {
  const rb = new RequestBuilder(rootUrl, getTestByIdApiV1TestsIdGet.PATH, 'get');
  if (params) {
    rb.path('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Test>;
    })
  );
}

getTestByIdApiV1TestsIdGet.PATH = '/api/v1/tests/{id}';
