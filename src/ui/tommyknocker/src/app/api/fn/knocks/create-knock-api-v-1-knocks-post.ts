/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Knock } from '../../models/knock';
import { NewKnock } from '../../models/new-knock';

export interface CreateKnockApiV1KnocksPost$Params {
      body: NewKnock
}

export function createKnockApiV1KnocksPost(http: HttpClient, rootUrl: string, params: CreateKnockApiV1KnocksPost$Params, context?: HttpContext): Observable<StrictHttpResponse<Knock>> {
  const rb = new RequestBuilder(rootUrl, createKnockApiV1KnocksPost.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Knock>;
    })
  );
}

createKnockApiV1KnocksPost.PATH = '/api/v1/knocks';
