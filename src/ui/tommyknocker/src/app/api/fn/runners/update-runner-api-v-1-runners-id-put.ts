/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Runner } from '../../models/runner';
import { UpdatedRunner } from '../../models/updated-runner';

export interface UpdateRunnerApiV1RunnersIdPut$Params {
  id: string;
      body: UpdatedRunner
}

export function updateRunnerApiV1RunnersIdPut(http: HttpClient, rootUrl: string, params: UpdateRunnerApiV1RunnersIdPut$Params, context?: HttpContext): Observable<StrictHttpResponse<Runner>> {
  const rb = new RequestBuilder(rootUrl, updateRunnerApiV1RunnersIdPut.PATH, 'put');
  if (params) {
    rb.path('id', params.id, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Runner>;
    })
  );
}

updateRunnerApiV1RunnersIdPut.PATH = '/api/v1/runners/{id}';
