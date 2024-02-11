/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ResponseExpectation } from '../../models/response-expectation';
import { UpdatedResponseExpectation } from '../../models/updated-response-expectation';

export interface UpdateResponseExpectationApiV1ResponseExpectationsIdPut$Params {
  id: string;
      body: UpdatedResponseExpectation
}

export function updateResponseExpectationApiV1ResponseExpectationsIdPut(http: HttpClient, rootUrl: string, params: UpdateResponseExpectationApiV1ResponseExpectationsIdPut$Params, context?: HttpContext): Observable<StrictHttpResponse<ResponseExpectation>> {
  const rb = new RequestBuilder(rootUrl, updateResponseExpectationApiV1ResponseExpectationsIdPut.PATH, 'put');
  if (params) {
    rb.path('id', params.id, {});
    rb.body(params.body, 'application/json');
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

updateResponseExpectationApiV1ResponseExpectationsIdPut.PATH = '/api/v1/response-expectations/{id}';
