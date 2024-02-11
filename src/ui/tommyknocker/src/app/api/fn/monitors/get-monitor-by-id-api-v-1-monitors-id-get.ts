/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Monitor } from '../../models/monitor';

export interface GetMonitorByIdApiV1MonitorsIdGet$Params {
  id: string;
}

export function getMonitorByIdApiV1MonitorsIdGet(http: HttpClient, rootUrl: string, params: GetMonitorByIdApiV1MonitorsIdGet$Params, context?: HttpContext): Observable<StrictHttpResponse<Monitor>> {
  const rb = new RequestBuilder(rootUrl, getMonitorByIdApiV1MonitorsIdGet.PATH, 'get');
  if (params) {
    rb.path('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Monitor>;
    })
  );
}

getMonitorByIdApiV1MonitorsIdGet.PATH = '/api/v1/monitors/{id}';
