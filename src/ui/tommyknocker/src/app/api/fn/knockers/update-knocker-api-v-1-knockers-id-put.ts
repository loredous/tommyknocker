/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Knocker } from '../../models/knocker';
import { UpdatedKnocker } from '../../models/updated-knocker';

export interface UpdateKnockerApiV1KnockersIdPut$Params {
  id: string;
      body: UpdatedKnocker
}

export function updateKnockerApiV1KnockersIdPut(http: HttpClient, rootUrl: string, params: UpdateKnockerApiV1KnockersIdPut$Params, context?: HttpContext): Observable<StrictHttpResponse<Knocker>> {
  const rb = new RequestBuilder(rootUrl, updateKnockerApiV1KnockersIdPut.PATH, 'put');
  if (params) {
    rb.path('id', params.id, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Knocker>;
    })
  );
}

updateKnockerApiV1KnockersIdPut.PATH = '/api/v1/knockers/{id}';
