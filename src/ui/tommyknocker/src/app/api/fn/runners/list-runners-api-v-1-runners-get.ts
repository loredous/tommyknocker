/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Runner } from '../../models/runner';

export interface ListRunnersApiV1RunnersGet$Params {
}

export function listRunnersApiV1RunnersGet(http: HttpClient, rootUrl: string, params?: ListRunnersApiV1RunnersGet$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Runner>>> {
  const rb = new RequestBuilder(rootUrl, listRunnersApiV1RunnersGet.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<Runner>>;
    })
  );
}

listRunnersApiV1RunnersGet.PATH = '/api/v1/runners';
