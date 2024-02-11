/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Monitor } from '../../models/monitor';
import { UpdatedMonitor } from '../../models/updated-monitor';

export interface UpdateMonitorApiV1MonitorsIdPut$Params {
  id: string;
      body: UpdatedMonitor
}

export function updateMonitorApiV1MonitorsIdPut(http: HttpClient, rootUrl: string, params: UpdateMonitorApiV1MonitorsIdPut$Params, context?: HttpContext): Observable<StrictHttpResponse<Monitor>> {
  const rb = new RequestBuilder(rootUrl, updateMonitorApiV1MonitorsIdPut.PATH, 'put');
  if (params) {
    rb.path('id', params.id, {});
    rb.body(params.body, 'application/json');
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

updateMonitorApiV1MonitorsIdPut.PATH = '/api/v1/monitors/{id}';
