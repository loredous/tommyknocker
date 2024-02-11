/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Knock } from '../../models/knock';
import { UpdatedKnock } from '../../models/updated-knock';

export interface UpdateKnockApiV1KnocksIdPut$Params {
  id: string;
      body: UpdatedKnock
}

export function updateKnockApiV1KnocksIdPut(http: HttpClient, rootUrl: string, params: UpdateKnockApiV1KnocksIdPut$Params, context?: HttpContext): Observable<StrictHttpResponse<Knock>> {
  const rb = new RequestBuilder(rootUrl, updateKnockApiV1KnocksIdPut.PATH, 'put');
  if (params) {
    rb.path('id', params.id, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Knock>;
    })
  );
}

updateKnockApiV1KnocksIdPut.PATH = '/api/v1/knocks/{id}';
