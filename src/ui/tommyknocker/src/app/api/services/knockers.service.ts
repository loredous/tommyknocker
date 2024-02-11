/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { createKnockerApiV1KnockersPost } from '../fn/knockers/create-knocker-api-v-1-knockers-post';
import { CreateKnockerApiV1KnockersPost$Params } from '../fn/knockers/create-knocker-api-v-1-knockers-post';
import { deleteKnockerApiV1KnockersIdDelete } from '../fn/knockers/delete-knocker-api-v-1-knockers-id-delete';
import { DeleteKnockerApiV1KnockersIdDelete$Params } from '../fn/knockers/delete-knocker-api-v-1-knockers-id-delete';
import { getKnockerByIdApiV1KnockersIdGet } from '../fn/knockers/get-knocker-by-id-api-v-1-knockers-id-get';
import { GetKnockerByIdApiV1KnockersIdGet$Params } from '../fn/knockers/get-knocker-by-id-api-v-1-knockers-id-get';
import { Knocker } from '../models/knocker';
import { knockerCheckinApiV1KnockersIdCheckinPost } from '../fn/knockers/knocker-checkin-api-v-1-knockers-id-checkin-post';
import { KnockerCheckinApiV1KnockersIdCheckinPost$Params } from '../fn/knockers/knocker-checkin-api-v-1-knockers-id-checkin-post';
import { listKnockersApiV1KnockersGet } from '../fn/knockers/list-knockers-api-v-1-knockers-get';
import { ListKnockersApiV1KnockersGet$Params } from '../fn/knockers/list-knockers-api-v-1-knockers-get';
import { Test } from '../models/test';
import { updateKnockerApiV1KnockersIdPut } from '../fn/knockers/update-knocker-api-v-1-knockers-id-put';
import { UpdateKnockerApiV1KnockersIdPut$Params } from '../fn/knockers/update-knocker-api-v-1-knockers-id-put';

@Injectable({ providedIn: 'root' })
export class KnockersService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `listKnockersApiV1KnockersGet()` */
  static readonly ListKnockersApiV1KnockersGetPath = '/api/v1/knockers';

  /**
   * List Knockers.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `listKnockersApiV1KnockersGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  listKnockersApiV1KnockersGet$Response(params?: ListKnockersApiV1KnockersGet$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Knocker>>> {
    return listKnockersApiV1KnockersGet(this.http, this.rootUrl, params, context);
  }

  /**
   * List Knockers.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `listKnockersApiV1KnockersGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  listKnockersApiV1KnockersGet(params?: ListKnockersApiV1KnockersGet$Params, context?: HttpContext): Observable<Array<Knocker>> {
    return this.listKnockersApiV1KnockersGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Knocker>>): Array<Knocker> => r.body)
    );
  }

  /** Path part for operation `createKnockerApiV1KnockersPost()` */
  static readonly CreateKnockerApiV1KnockersPostPath = '/api/v1/knockers';

  /**
   * Create Knocker.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createKnockerApiV1KnockersPost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createKnockerApiV1KnockersPost$Response(params: CreateKnockerApiV1KnockersPost$Params, context?: HttpContext): Observable<StrictHttpResponse<Knocker>> {
    return createKnockerApiV1KnockersPost(this.http, this.rootUrl, params, context);
  }

  /**
   * Create Knocker.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createKnockerApiV1KnockersPost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createKnockerApiV1KnockersPost(params: CreateKnockerApiV1KnockersPost$Params, context?: HttpContext): Observable<Knocker> {
    return this.createKnockerApiV1KnockersPost$Response(params, context).pipe(
      map((r: StrictHttpResponse<Knocker>): Knocker => r.body)
    );
  }

  /** Path part for operation `getKnockerByIdApiV1KnockersIdGet()` */
  static readonly GetKnockerByIdApiV1KnockersIdGetPath = '/api/v1/knockers/{id}';

  /**
   * Get Knocker By Id.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getKnockerByIdApiV1KnockersIdGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  getKnockerByIdApiV1KnockersIdGet$Response(params: GetKnockerByIdApiV1KnockersIdGet$Params, context?: HttpContext): Observable<StrictHttpResponse<Knocker>> {
    return getKnockerByIdApiV1KnockersIdGet(this.http, this.rootUrl, params, context);
  }

  /**
   * Get Knocker By Id.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getKnockerByIdApiV1KnockersIdGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getKnockerByIdApiV1KnockersIdGet(params: GetKnockerByIdApiV1KnockersIdGet$Params, context?: HttpContext): Observable<Knocker> {
    return this.getKnockerByIdApiV1KnockersIdGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<Knocker>): Knocker => r.body)
    );
  }

  /** Path part for operation `updateKnockerApiV1KnockersIdPut()` */
  static readonly UpdateKnockerApiV1KnockersIdPutPath = '/api/v1/knockers/{id}';

  /**
   * Update Knocker.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateKnockerApiV1KnockersIdPut()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateKnockerApiV1KnockersIdPut$Response(params: UpdateKnockerApiV1KnockersIdPut$Params, context?: HttpContext): Observable<StrictHttpResponse<Knocker>> {
    return updateKnockerApiV1KnockersIdPut(this.http, this.rootUrl, params, context);
  }

  /**
   * Update Knocker.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateKnockerApiV1KnockersIdPut$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateKnockerApiV1KnockersIdPut(params: UpdateKnockerApiV1KnockersIdPut$Params, context?: HttpContext): Observable<Knocker> {
    return this.updateKnockerApiV1KnockersIdPut$Response(params, context).pipe(
      map((r: StrictHttpResponse<Knocker>): Knocker => r.body)
    );
  }

  /** Path part for operation `deleteKnockerApiV1KnockersIdDelete()` */
  static readonly DeleteKnockerApiV1KnockersIdDeletePath = '/api/v1/knockers/{id}';

  /**
   * Delete Knocker.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteKnockerApiV1KnockersIdDelete()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteKnockerApiV1KnockersIdDelete$Response(params: DeleteKnockerApiV1KnockersIdDelete$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
    return deleteKnockerApiV1KnockersIdDelete(this.http, this.rootUrl, params, context);
  }

  /**
   * Delete Knocker.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteKnockerApiV1KnockersIdDelete$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteKnockerApiV1KnockersIdDelete(params: DeleteKnockerApiV1KnockersIdDelete$Params, context?: HttpContext): Observable<any> {
    return this.deleteKnockerApiV1KnockersIdDelete$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>): any => r.body)
    );
  }

  /** Path part for operation `knockerCheckinApiV1KnockersIdCheckinPost()` */
  static readonly KnockerCheckinApiV1KnockersIdCheckinPostPath = '/api/v1/knockers/{id}/checkin';

  /**
   * Knocker Checkin.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `knockerCheckinApiV1KnockersIdCheckinPost()` instead.
   *
   * This method doesn't expect any request body.
   */
  knockerCheckinApiV1KnockersIdCheckinPost$Response(params: KnockerCheckinApiV1KnockersIdCheckinPost$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Test>>> {
    return knockerCheckinApiV1KnockersIdCheckinPost(this.http, this.rootUrl, params, context);
  }

  /**
   * Knocker Checkin.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `knockerCheckinApiV1KnockersIdCheckinPost$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  knockerCheckinApiV1KnockersIdCheckinPost(params: KnockerCheckinApiV1KnockersIdCheckinPost$Params, context?: HttpContext): Observable<Array<Test>> {
    return this.knockerCheckinApiV1KnockersIdCheckinPost$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Test>>): Array<Test> => r.body)
    );
  }

}
