/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface DeleteTestSuiteApiV1TestSuitesIdDelete$Params {
  id: string;
}

export function deleteTestSuiteApiV1TestSuitesIdDelete(http: HttpClient, rootUrl: string, params: DeleteTestSuiteApiV1TestSuitesIdDelete$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
  const rb = new RequestBuilder(rootUrl, deleteTestSuiteApiV1TestSuitesIdDelete.PATH, 'delete');
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

deleteTestSuiteApiV1TestSuitesIdDelete.PATH = '/api/v1/test-suites/{id}';
