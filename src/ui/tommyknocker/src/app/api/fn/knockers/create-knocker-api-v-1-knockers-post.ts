/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Knocker } from '../../models/knocker';
import { NewKnocker } from '../../models/new-knocker';

export interface CreateKnockerApiV1KnockersPost$Params {
      body: NewKnocker
}

export function createKnockerApiV1KnockersPost(http: HttpClient, rootUrl: string, params: CreateKnockerApiV1KnockersPost$Params, context?: HttpContext): Observable<StrictHttpResponse<Knocker>> {
  const rb = new RequestBuilder(rootUrl, createKnockerApiV1KnockersPost.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Knocker>;
    })
  );
}

createKnockerApiV1KnockersPost.PATH = '/api/v1/knockers';
