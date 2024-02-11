/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ResponseExpectation } from '../../models/response-expectation';

export interface GetResponseExpectationByIdApiV1ResponseExpectationsIdGet$Params {
  id: string;
}

export function getResponseExpectationByIdApiV1ResponseExpectationsIdGet(http: HttpClient, rootUrl: string, params: GetResponseExpectationByIdApiV1ResponseExpectationsIdGet$Params, context?: HttpContext): Observable<StrictHttpResponse<ResponseExpectation>> {
  const rb = new RequestBuilder(rootUrl, getResponseExpectationByIdApiV1ResponseExpectationsIdGet.PATH, 'get');
  if (params) {
    rb.path('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<ResponseExpectation>;
    })
  );
}

getResponseExpectationByIdApiV1ResponseExpectationsIdGet.PATH = '/api/v1/response-expectations/{id}';
