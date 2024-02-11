/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Knock } from '../../models/knock';

export interface GetKnockByIdApiV1KnocksIdGet$Params {
  id: string;
}

export function getKnockByIdApiV1KnocksIdGet(http: HttpClient, rootUrl: string, params: GetKnockByIdApiV1KnocksIdGet$Params, context?: HttpContext): Observable<StrictHttpResponse<Knock>> {
  const rb = new RequestBuilder(rootUrl, getKnockByIdApiV1KnocksIdGet.PATH, 'get');
  if (params) {
    rb.path('id', params.id, {});
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

getKnockByIdApiV1KnocksIdGet.PATH = '/api/v1/knocks/{id}';
