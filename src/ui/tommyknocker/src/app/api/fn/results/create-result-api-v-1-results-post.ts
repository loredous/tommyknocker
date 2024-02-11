/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { NewResult } from '../../models/new-result';
import { Result } from '../../models/result';

export interface CreateResultApiV1ResultsPost$Params {
      body: NewResult
}

export function createResultApiV1ResultsPost(http: HttpClient, rootUrl: string, params: CreateResultApiV1ResultsPost$Params, context?: HttpContext): Observable<StrictHttpResponse<Result>> {
  const rb = new RequestBuilder(rootUrl, createResultApiV1ResultsPost.PATH, 'post');
  if (params) {
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

createResultApiV1ResultsPost.PATH = '/api/v1/results';
