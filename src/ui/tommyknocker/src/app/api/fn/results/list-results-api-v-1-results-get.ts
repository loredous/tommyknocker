/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Result } from '../../models/result';

export interface ListResultsApiV1ResultsGet$Params {
}

export function listResultsApiV1ResultsGet(http: HttpClient, rootUrl: string, params?: ListResultsApiV1ResultsGet$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Result>>> {
  const rb = new RequestBuilder(rootUrl, listResultsApiV1ResultsGet.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<Result>>;
    })
  );
}

listResultsApiV1ResultsGet.PATH = '/api/v1/results';
