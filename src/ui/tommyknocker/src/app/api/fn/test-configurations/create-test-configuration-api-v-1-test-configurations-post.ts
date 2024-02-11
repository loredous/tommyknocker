/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { NewTestConfiguration } from '../../models/new-test-configuration';
import { TestConfiguration } from '../../models/test-configuration';

export interface CreateTestConfigurationApiV1TestConfigurationsPost$Params {
      body: NewTestConfiguration
}

export function createTestConfigurationApiV1TestConfigurationsPost(http: HttpClient, rootUrl: string, params: CreateTestConfigurationApiV1TestConfigurationsPost$Params, context?: HttpContext): Observable<StrictHttpResponse<TestConfiguration>> {
  const rb = new RequestBuilder(rootUrl, createTestConfigurationApiV1TestConfigurationsPost.PATH, 'post');
  if (params) {
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

createTestConfigurationApiV1TestConfigurationsPost.PATH = '/api/v1/test-configurations';
