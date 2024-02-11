/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface DeleteTestComponentStatusApiV1TestComponentStatusesIdDelete$Params {
  id: string;
}

export function deleteTestComponentStatusApiV1TestComponentStatusesIdDelete(http: HttpClient, rootUrl: string, params: DeleteTestComponentStatusApiV1TestComponentStatusesIdDelete$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
  const rb = new RequestBuilder(rootUrl, deleteTestComponentStatusApiV1TestComponentStatusesIdDelete.PATH, 'delete');
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

deleteTestComponentStatusApiV1TestComponentStatusesIdDelete.PATH = '/api/v1/test-component-statuses/{id}';
