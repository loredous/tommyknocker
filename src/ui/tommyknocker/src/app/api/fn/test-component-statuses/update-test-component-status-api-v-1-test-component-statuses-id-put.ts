/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { TestComponentStatus } from '../../models/test-component-status';
import { UpdatedTestComponentStatus } from '../../models/updated-test-component-status';

export interface UpdateTestComponentStatusApiV1TestComponentStatusesIdPut$Params {
  id: string;
      body: UpdatedTestComponentStatus
}

export function updateTestComponentStatusApiV1TestComponentStatusesIdPut(http: HttpClient, rootUrl: string, params: UpdateTestComponentStatusApiV1TestComponentStatusesIdPut$Params, context?: HttpContext): Observable<StrictHttpResponse<TestComponentStatus>> {
  const rb = new RequestBuilder(rootUrl, updateTestComponentStatusApiV1TestComponentStatusesIdPut.PATH, 'put');
  if (params) {
    rb.path('id', params.id, {});
    rb.body(params.body, 'application/json');
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

updateTestComponentStatusApiV1TestComponentStatusesIdPut.PATH = '/api/v1/test-component-statuses/{id}';
