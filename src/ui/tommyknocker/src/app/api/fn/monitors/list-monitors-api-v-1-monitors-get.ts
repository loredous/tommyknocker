/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Monitor } from '../../models/monitor';

export interface ListMonitorsApiV1MonitorsGet$Params {
}

export function listMonitorsApiV1MonitorsGet(http: HttpClient, rootUrl: string, params?: ListMonitorsApiV1MonitorsGet$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Monitor>>> {
  const rb = new RequestBuilder(rootUrl, listMonitorsApiV1MonitorsGet.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<Monitor>>;
    })
  );
}

listMonitorsApiV1MonitorsGet.PATH = '/api/v1/monitors';
