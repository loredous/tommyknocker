/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { TestConfiguration } from '../../models/test-configuration';

export interface GetTestConfigurationByIdApiV1TestConfigurationsIdGet$Params {
  id: string;
}

export function getTestConfigurationByIdApiV1TestConfigurationsIdGet(http: HttpClient, rootUrl: string, params: GetTestConfigurationByIdApiV1TestConfigurationsIdGet$Params, context?: HttpContext): Observable<StrictHttpResponse<TestConfiguration>> {
  const rb = new RequestBuilder(rootUrl, getTestConfigurationByIdApiV1TestConfigurationsIdGet.PATH, 'get');
  if (params) {
    rb.path('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<TestConfiguration>;
    })
  );
}

getTestConfigurationByIdApiV1TestConfigurationsIdGet.PATH = '/api/v1/test-configurations/{id}';
