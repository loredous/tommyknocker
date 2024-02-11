/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Test } from '../../models/test';

export interface AddTestComponentStatusApiV1TestsIdAddComponentStatusStatusIdPut$Params {
  id: string;
  status_id: string;
}

export function addTestComponentStatusApiV1TestsIdAddComponentStatusStatusIdPut(http: HttpClient, rootUrl: string, params: AddTestComponentStatusApiV1TestsIdAddComponentStatusStatusIdPut$Params, context?: HttpContext): Observable<StrictHttpResponse<Test>> {
  const rb = new RequestBuilder(rootUrl, addTestComponentStatusApiV1TestsIdAddComponentStatusStatusIdPut.PATH, 'put');
  if (params) {
    rb.path('id', params.id, {});
    rb.path('status_id', params.status_id, {});
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

addTestComponentStatusApiV1TestsIdAddComponentStatusStatusIdPut.PATH = '/api/v1/tests/{id}/add_component_status/{status_id}';
