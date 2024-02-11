/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Result } from '../../models/result';

export interface GetResultByIdApiV1ResultsIdGet$Params {
  id: string;
}

export function getResultByIdApiV1ResultsIdGet(http: HttpClient, rootUrl: string, params: GetResultByIdApiV1ResultsIdGet$Params, context?: HttpContext): Observable<StrictHttpResponse<Result>> {
  const rb = new RequestBuilder(rootUrl, getResultByIdApiV1ResultsIdGet.PATH, 'get');
  if (params) {
    rb.path('id', params.id, {});
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

getResultByIdApiV1ResultsIdGet.PATH = '/api/v1/results/{id}';
