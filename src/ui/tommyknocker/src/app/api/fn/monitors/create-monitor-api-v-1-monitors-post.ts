/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Monitor } from '../../models/monitor';
import { NewMonitor } from '../../models/new-monitor';

export interface CreateMonitorApiV1MonitorsPost$Params {
      body: NewMonitor
}

export function createMonitorApiV1MonitorsPost(http: HttpClient, rootUrl: string, params: CreateMonitorApiV1MonitorsPost$Params, context?: HttpContext): Observable<StrictHttpResponse<Monitor>> {
  const rb = new RequestBuilder(rootUrl, createMonitorApiV1MonitorsPost.PATH, 'post');
  if (params) {
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

createMonitorApiV1MonitorsPost.PATH = '/api/v1/monitors';
