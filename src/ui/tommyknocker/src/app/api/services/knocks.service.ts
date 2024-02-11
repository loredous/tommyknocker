/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { createKnockApiV1KnocksPost } from '../fn/knocks/create-knock-api-v-1-knocks-post';
import { CreateKnockApiV1KnocksPost$Params } from '../fn/knocks/create-knock-api-v-1-knocks-post';
import { deleteKnockApiV1KnocksIdDelete } from '../fn/knocks/delete-knock-api-v-1-knocks-id-delete';
import { DeleteKnockApiV1KnocksIdDelete$Params } from '../fn/knocks/delete-knock-api-v-1-knocks-id-delete';
import { getKnockByIdApiV1KnocksIdGet } from '../fn/knocks/get-knock-by-id-api-v-1-knocks-id-get';
import { GetKnockByIdApiV1KnocksIdGet$Params } from '../fn/knocks/get-knock-by-id-api-v-1-knocks-id-get';
import { Knock } from '../models/knock';
import { listKnocksApiV1KnocksGet } from '../fn/knocks/list-knocks-api-v-1-knocks-get';
import { ListKnocksApiV1KnocksGet$Params } from '../fn/knocks/list-knocks-api-v-1-knocks-get';
import { updateKnockApiV1KnocksIdPut } from '../fn/knocks/update-knock-api-v-1-knocks-id-put';
import { UpdateKnockApiV1KnocksIdPut$Params } from '../fn/knocks/update-knock-api-v-1-knocks-id-put';

@Injectable({ providedIn: 'root' })
export class KnocksService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `listKnocksApiV1KnocksGet()` */
  static readonly ListKnocksApiV1KnocksGetPath = '/api/v1/knocks';

  /**
   * List Knocks.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `listKnocksApiV1KnocksGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  listKnocksApiV1KnocksGet$Response(params?: ListKnocksApiV1KnocksGet$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Knock>>> {
    return listKnocksApiV1KnocksGet(this.http, this.rootUrl, params, context);
  }

  /**
   * List Knocks.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `listKnocksApiV1KnocksGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  listKnocksApiV1KnocksGet(params?: ListKnocksApiV1KnocksGet$Params, context?: HttpContext): Observable<Array<Knock>> {
    return this.listKnocksApiV1KnocksGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Knock>>): Array<Knock> => r.body)
    );
  }

  /** Path part for operation `createKnockApiV1KnocksPost()` */
  static readonly CreateKnockApiV1KnocksPostPath = '/api/v1/knocks';

  /**
   * Create Knock.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createKnockApiV1KnocksPost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createKnockApiV1KnocksPost$Response(params: CreateKnockApiV1KnocksPost$Params, context?: HttpContext): Observable<StrictHttpResponse<Knock>> {
    return createKnockApiV1KnocksPost(this.http, this.rootUrl, params, context);
  }

  /**
   * Create Knock.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createKnockApiV1KnocksPost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createKnockApiV1KnocksPost(params: CreateKnockApiV1KnocksPost$Params, context?: HttpContext): Observable<Knock> {
    return this.createKnockApiV1KnocksPost$Response(params, context).pipe(
      map((r: StrictHttpResponse<Knock>): Knock => r.body)
    );
  }

  /** Path part for operation `getKnockByIdApiV1KnocksIdGet()` */
  static readonly GetKnockByIdApiV1KnocksIdGetPath = '/api/v1/knocks/{id}';

  /**
   * Get Knock By Id.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getKnockByIdApiV1KnocksIdGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  getKnockByIdApiV1KnocksIdGet$Response(params: GetKnockByIdApiV1KnocksIdGet$Params, context?: HttpContext): Observable<StrictHttpResponse<Knock>> {
    return getKnockByIdApiV1KnocksIdGet(this.http, this.rootUrl, params, context);
  }

  /**
   * Get Knock By Id.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getKnockByIdApiV1KnocksIdGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getKnockByIdApiV1KnocksIdGet(params: GetKnockByIdApiV1KnocksIdGet$Params, context?: HttpContext): Observable<Knock> {
    return this.getKnockByIdApiV1KnocksIdGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<Knock>): Knock => r.body)
    );
  }

  /** Path part for operation `updateKnockApiV1KnocksIdPut()` */
  static readonly UpdateKnockApiV1KnocksIdPutPath = '/api/v1/knocks/{id}';

  /**
   * Update Knock.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateKnockApiV1KnocksIdPut()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateKnockApiV1KnocksIdPut$Response(params: UpdateKnockApiV1KnocksIdPut$Params, context?: HttpContext): Observable<StrictHttpResponse<Knock>> {
    return updateKnockApiV1KnocksIdPut(this.http, this.rootUrl, params, context);
  }

  /**
   * Update Knock.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateKnockApiV1KnocksIdPut$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateKnockApiV1KnocksIdPut(params: UpdateKnockApiV1KnocksIdPut$Params, context?: HttpContext): Observable<Knock> {
    return this.updateKnockApiV1KnocksIdPut$Response(params, context).pipe(
      map((r: StrictHttpResponse<Knock>): Knock => r.body)
    );
  }

  /** Path part for operation `deleteKnockApiV1KnocksIdDelete()` */
  static readonly DeleteKnockApiV1KnocksIdDeletePath = '/api/v1/knocks/{id}';

  /**
   * Delete Knock.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteKnockApiV1KnocksIdDelete()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteKnockApiV1KnocksIdDelete$Response(params: DeleteKnockApiV1KnocksIdDelete$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
    return deleteKnockApiV1KnocksIdDelete(this.http, this.rootUrl, params, context);
  }

  /**
   * Delete Knock.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteKnockApiV1KnocksIdDelete$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteKnockApiV1KnocksIdDelete(params: DeleteKnockApiV1KnocksIdDelete$Params, context?: HttpContext): Observable<any> {
    return this.deleteKnockApiV1KnocksIdDelete$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>): any => r.body)
    );
  }

}
