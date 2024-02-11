/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ResponseExpectation } from '../../models/response-expectation';

export interface ListResponseExpectationsApiV1ResponseExpectationsGet$Params {
}

export function listResponseExpectationsApiV1ResponseExpectationsGet(http: HttpClient, rootUrl: string, params?: ListResponseExpectationsApiV1ResponseExpectationsGet$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ResponseExpectation>>> {
  const rb = new RequestBuilder(rootUrl, listResponseExpectationsApiV1ResponseExpectationsGet.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<ResponseExpectation>>;
    })
  );
}

listResponseExpectationsApiV1ResponseExpectationsGet.PATH = '/api/v1/response-expectations';
