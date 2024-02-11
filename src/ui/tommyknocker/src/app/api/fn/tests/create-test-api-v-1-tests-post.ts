/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { NewTest } from '../../models/new-test';
import { Test } from '../../models/test';

export interface CreateTestApiV1TestsPost$Params {
      body: NewTest
}

export function createTestApiV1TestsPost(http: HttpClient, rootUrl: string, params: CreateTestApiV1TestsPost$Params, context?: HttpContext): Observable<StrictHttpResponse<Test>> {
  const rb = new RequestBuilder(rootUrl, createTestApiV1TestsPost.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Test>;
    })
  );
}

createTestApiV1TestsPost.PATH = '/api/v1/tests';
