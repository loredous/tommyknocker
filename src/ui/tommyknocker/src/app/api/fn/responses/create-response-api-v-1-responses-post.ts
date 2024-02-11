/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { NewResponse } from '../../models/new-response';
import { Response } from '../../models/response';

export interface CreateResponseApiV1ResponsesPost$Params {
      body: NewResponse
}

export function createResponseApiV1ResponsesPost(http: HttpClient, rootUrl: string, params: CreateResponseApiV1ResponsesPost$Params, context?: HttpContext): Observable<StrictHttpResponse<Response>> {
  const rb = new RequestBuilder(rootUrl, createResponseApiV1ResponsesPost.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
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

createResponseApiV1ResponsesPost.PATH = '/api/v1/responses';
