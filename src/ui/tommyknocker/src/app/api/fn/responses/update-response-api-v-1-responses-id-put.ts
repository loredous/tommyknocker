/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Response } from '../../models/response';
import { UpdatedResponse } from '../../models/updated-response';

export interface UpdateResponseApiV1ResponsesIdPut$Params {
  id: string;
      body: UpdatedResponse
}

export function updateResponseApiV1ResponsesIdPut(http: HttpClient, rootUrl: string, params: UpdateResponseApiV1ResponsesIdPut$Params, context?: HttpContext): Observable<StrictHttpResponse<Response>> {
  const rb = new RequestBuilder(rootUrl, updateResponseApiV1ResponsesIdPut.PATH, 'put');
  if (params) {
    rb.path('id', params.id, {});
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

updateResponseApiV1ResponsesIdPut.PATH = '/api/v1/responses/{id}';
