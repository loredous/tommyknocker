/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Knocker } from '../../models/knocker';

export interface GetKnockerByIdApiV1KnockersIdGet$Params {
  id: string;
}

export function getKnockerByIdApiV1KnockersIdGet(http: HttpClient, rootUrl: string, params: GetKnockerByIdApiV1KnockersIdGet$Params, context?: HttpContext): Observable<StrictHttpResponse<Knocker>> {
  const rb = new RequestBuilder(rootUrl, getKnockerByIdApiV1KnockersIdGet.PATH, 'get');
  if (params) {
    rb.path('id', params.id, {});
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

getKnockerByIdApiV1KnockersIdGet.PATH = '/api/v1/knockers/{id}';
