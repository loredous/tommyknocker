/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { TestConfiguration } from '../../models/test-configuration';

export interface ListTestConfigurationsApiV1TestConfigurationsGet$Params {
}

export function listTestConfigurationsApiV1TestConfigurationsGet(http: HttpClient, rootUrl: string, params?: ListTestConfigurationsApiV1TestConfigurationsGet$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<TestConfiguration>>> {
  const rb = new RequestBuilder(rootUrl, listTestConfigurationsApiV1TestConfigurationsGet.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<TestConfiguration>>;
    })
  );
}

listTestConfigurationsApiV1TestConfigurationsGet.PATH = '/api/v1/test-configurations';
