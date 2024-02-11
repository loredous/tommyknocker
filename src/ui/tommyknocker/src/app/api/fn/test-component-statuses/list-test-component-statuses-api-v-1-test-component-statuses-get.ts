/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { TestComponentStatus } from '../../models/test-component-status';

export interface ListTestComponentStatusesApiV1TestComponentStatusesGet$Params {
}

export function listTestComponentStatusesApiV1TestComponentStatusesGet(http: HttpClient, rootUrl: string, params?: ListTestComponentStatusesApiV1TestComponentStatusesGet$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<TestComponentStatus>>> {
  const rb = new RequestBuilder(rootUrl, listTestComponentStatusesApiV1TestComponentStatusesGet.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<TestComponentStatus>>;
    })
  );
}

listTestComponentStatusesApiV1TestComponentStatusesGet.PATH = '/api/v1/test-component-statuses';
