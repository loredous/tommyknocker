/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Knock } from '../../models/knock';

export interface ListKnocksApiV1KnocksGet$Params {
}

export function listKnocksApiV1KnocksGet(http: HttpClient, rootUrl: string, params?: ListKnocksApiV1KnocksGet$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Knock>>> {
  const rb = new RequestBuilder(rootUrl, listKnocksApiV1KnocksGet.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<Knock>>;
    })
  );
}

listKnocksApiV1KnocksGet.PATH = '/api/v1/knocks';
