/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { TestComponentStatus } from '../../models/test-component-status';

export interface GetTestComponentStatusByIdApiV1TestComponentStatusesIdGet$Params {
  id: string;
}

export function getTestComponentStatusByIdApiV1TestComponentStatusesIdGet(http: HttpClient, rootUrl: string, params: GetTestComponentStatusByIdApiV1TestComponentStatusesIdGet$Params, context?: HttpContext): Observable<StrictHttpResponse<TestComponentStatus>> {
  const rb = new RequestBuilder(rootUrl, getTestComponentStatusByIdApiV1TestComponentStatusesIdGet.PATH, 'get');
  if (params) {
    rb.path('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<TestComponentStatus>;
    })
  );
}

getTestComponentStatusByIdApiV1TestComponentStatusesIdGet.PATH = '/api/v1/test-component-statuses/{id}';
