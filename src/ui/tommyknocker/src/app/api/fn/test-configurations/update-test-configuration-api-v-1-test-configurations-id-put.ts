/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { TestConfiguration } from '../../models/test-configuration';
import { UpdatedTestConfiguration } from '../../models/updated-test-configuration';

export interface UpdateTestConfigurationApiV1TestConfigurationsIdPut$Params {
  id: string;
      body: UpdatedTestConfiguration
}

export function updateTestConfigurationApiV1TestConfigurationsIdPut(http: HttpClient, rootUrl: string, params: UpdateTestConfigurationApiV1TestConfigurationsIdPut$Params, context?: HttpContext): Observable<StrictHttpResponse<TestConfiguration>> {
  const rb = new RequestBuilder(rootUrl, updateTestConfigurationApiV1TestConfigurationsIdPut.PATH, 'put');
  if (params) {
    rb.path('id', params.id, {});
    rb.body(params.body, 'application/json');
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

updateTestConfigurationApiV1TestConfigurationsIdPut.PATH = '/api/v1/test-configurations/{id}';
