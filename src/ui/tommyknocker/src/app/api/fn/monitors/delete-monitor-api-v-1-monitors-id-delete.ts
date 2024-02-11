/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface DeleteMonitorApiV1MonitorsIdDelete$Params {
  id: string;
}

export function deleteMonitorApiV1MonitorsIdDelete(http: HttpClient, rootUrl: string, params: DeleteMonitorApiV1MonitorsIdDelete$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
  const rb = new RequestBuilder(rootUrl, deleteMonitorApiV1MonitorsIdDelete.PATH, 'delete');
  if (params) {
    rb.path('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<any>;
    })
  );
}

deleteMonitorApiV1MonitorsIdDelete.PATH = '/api/v1/monitors/{id}';
