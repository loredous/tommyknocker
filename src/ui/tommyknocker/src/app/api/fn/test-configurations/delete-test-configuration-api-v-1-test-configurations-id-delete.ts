/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface DeleteTestConfigurationApiV1TestConfigurationsIdDelete$Params {
  id: string;
}

export function deleteTestConfigurationApiV1TestConfigurationsIdDelete(http: HttpClient, rootUrl: string, params: DeleteTestConfigurationApiV1TestConfigurationsIdDelete$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
  const rb = new RequestBuilder(rootUrl, deleteTestConfigurationApiV1TestConfigurationsIdDelete.PATH, 'delete');
  if (params) {
    rb.path('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<any>;
    })
  );
}

deleteTestConfigurationApiV1TestConfigurationsIdDelete.PATH = '/api/v1/test-configurations/{id}';
