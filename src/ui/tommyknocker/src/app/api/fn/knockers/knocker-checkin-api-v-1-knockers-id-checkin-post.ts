/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Test } from '../../models/test';

export interface KnockerCheckinApiV1KnockersIdCheckinPost$Params {
  id: string;
}

export function knockerCheckinApiV1KnockersIdCheckinPost(http: HttpClient, rootUrl: string, params: KnockerCheckinApiV1KnockersIdCheckinPost$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Test>>> {
  const rb = new RequestBuilder(rootUrl, knockerCheckinApiV1KnockersIdCheckinPost.PATH, 'post');
  if (params) {
    rb.path('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<Test>>;
    })
  );
}

knockerCheckinApiV1KnockersIdCheckinPost.PATH = '/api/v1/knockers/{id}/checkin';
