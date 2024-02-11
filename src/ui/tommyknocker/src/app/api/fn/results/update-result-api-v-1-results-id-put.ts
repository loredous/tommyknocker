/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Result } from '../../models/result';
import { UpdatedResult } from '../../models/updated-result';

export interface UpdateResultApiV1ResultsIdPut$Params {
  id: string;
      body: UpdatedResult
}

export function updateResultApiV1ResultsIdPut(http: HttpClient, rootUrl: string, params: UpdateResultApiV1ResultsIdPut$Params, context?: HttpContext): Observable<StrictHttpResponse<Result>> {
  const rb = new RequestBuilder(rootUrl, updateResultApiV1ResultsIdPut.PATH, 'put');
  if (params) {
    rb.path('id', params.id, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Result>;
    })
  );
}

updateResultApiV1ResultsIdPut.PATH = '/api/v1/results/{id}';
