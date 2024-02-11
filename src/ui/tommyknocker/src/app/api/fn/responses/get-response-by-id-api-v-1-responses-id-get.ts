/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Response } from '../../models/response';

export interface GetResponseByIdApiV1ResponsesIdGet$Params {
  id: string;
}

export function getResponseByIdApiV1ResponsesIdGet(http: HttpClient, rootUrl: string, params: GetResponseByIdApiV1ResponsesIdGet$Params, context?: HttpContext): Observable<StrictHttpResponse<Response>> {
  const rb = new RequestBuilder(rootUrl, getResponseByIdApiV1ResponsesIdGet.PATH, 'get');
  if (params) {
    rb.path('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Response>;
    })
  );
}

getResponseByIdApiV1ResponsesIdGet.PATH = '/api/v1/responses/{id}';
