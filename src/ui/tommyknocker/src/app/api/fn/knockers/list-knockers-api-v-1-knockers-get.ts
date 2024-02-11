/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Knocker } from '../../models/knocker';

export interface ListKnockersApiV1KnockersGet$Params {
}

export function listKnockersApiV1KnockersGet(http: HttpClient, rootUrl: string, params?: ListKnockersApiV1KnockersGet$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Knocker>>> {
  const rb = new RequestBuilder(rootUrl, listKnockersApiV1KnockersGet.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<Knocker>>;
    })
  );
}

listKnockersApiV1KnockersGet.PATH = '/api/v1/knockers';
