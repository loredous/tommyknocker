/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { createTestComponentStatusApiV1TestComponentStatusesPost } from '../fn/test-component-statuses/create-test-component-status-api-v-1-test-component-statuses-post';
import { CreateTestComponentStatusApiV1TestComponentStatusesPost$Params } from '../fn/test-component-statuses/create-test-component-status-api-v-1-test-component-statuses-post';
import { deleteTestComponentStatusApiV1TestComponentStatusesIdDelete } from '../fn/test-component-statuses/delete-test-component-status-api-v-1-test-component-statuses-id-delete';
import { DeleteTestComponentStatusApiV1TestComponentStatusesIdDelete$Params } from '../fn/test-component-statuses/delete-test-component-status-api-v-1-test-component-statuses-id-delete';
import { getTestComponentStatusByIdApiV1TestComponentStatusesIdGet } from '../fn/test-component-statuses/get-test-component-status-by-id-api-v-1-test-component-statuses-id-get';
import { GetTestComponentStatusByIdApiV1TestComponentStatusesIdGet$Params } from '../fn/test-component-statuses/get-test-component-status-by-id-api-v-1-test-component-statuses-id-get';
import { listTestComponentStatusesApiV1TestComponentStatusesGet } from '../fn/test-component-statuses/list-test-component-statuses-api-v-1-test-component-statuses-get';
import { ListTestComponentStatusesApiV1TestComponentStatusesGet$Params } from '../fn/test-component-statuses/list-test-component-statuses-api-v-1-test-component-statuses-get';
import { TestComponentStatus } from '../models/test-component-status';
import { updateTestComponentStatusApiV1TestComponentStatusesIdPut } from '../fn/test-component-statuses/update-test-component-status-api-v-1-test-component-statuses-id-put';
import { UpdateTestComponentStatusApiV1TestComponentStatusesIdPut$Params } from '../fn/test-component-statuses/update-test-component-status-api-v-1-test-component-statuses-id-put';

@Injectable({ providedIn: 'root' })
export class TestComponentStatusesService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `listTestComponentStatusesApiV1TestComponentStatusesGet()` */
  static readonly ListTestComponentStatusesApiV1TestComponentStatusesGetPath = '/api/v1/test-component-statuses';

  /**
   * List Test Component Statuses.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `listTestComponentStatusesApiV1TestComponentStatusesGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  listTestComponentStatusesApiV1TestComponentStatusesGet$Response(params?: ListTestComponentStatusesApiV1TestComponentStatusesGet$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<TestComponentStatus>>> {
    return listTestComponentStatusesApiV1TestComponentStatusesGet(this.http, this.rootUrl, params, context);
  }

  /**
   * List Test Component Statuses.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `listTestComponentStatusesApiV1TestComponentStatusesGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  listTestComponentStatusesApiV1TestComponentStatusesGet(params?: ListTestComponentStatusesApiV1TestComponentStatusesGet$Params, context?: HttpContext): Observable<Array<TestComponentStatus>> {
    return this.listTestComponentStatusesApiV1TestComponentStatusesGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<TestComponentStatus>>): Array<TestComponentStatus> => r.body)
    );
  }

  /** Path part for operation `createTestComponentStatusApiV1TestComponentStatusesPost()` */
  static readonly CreateTestComponentStatusApiV1TestComponentStatusesPostPath = '/api/v1/test-component-statuses';

  /**
   * Create Test Component Status.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createTestComponentStatusApiV1TestComponentStatusesPost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createTestComponentStatusApiV1TestComponentStatusesPost$Response(params: CreateTestComponentStatusApiV1TestComponentStatusesPost$Params, context?: HttpContext): Observable<StrictHttpResponse<TestComponentStatus>> {
    return createTestComponentStatusApiV1TestComponentStatusesPost(this.http, this.rootUrl, params, context);
  }

  /**
   * Create Test Component Status.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createTestComponentStatusApiV1TestComponentStatusesPost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createTestComponentStatusApiV1TestComponentStatusesPost(params: CreateTestComponentStatusApiV1TestComponentStatusesPost$Params, context?: HttpContext): Observable<TestComponentStatus> {
    return this.createTestComponentStatusApiV1TestComponentStatusesPost$Response(params, context).pipe(
      map((r: StrictHttpResponse<TestComponentStatus>): TestComponentStatus => r.body)
    );
  }

  /** Path part for operation `getTestComponentStatusByIdApiV1TestComponentStatusesIdGet()` */
  static readonly GetTestComponentStatusByIdApiV1TestComponentStatusesIdGetPath = '/api/v1/test-component-statuses/{id}';

  /**
   * Get Test Component Status By Id.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getTestComponentStatusByIdApiV1TestComponentStatusesIdGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTestComponentStatusByIdApiV1TestComponentStatusesIdGet$Response(params: GetTestComponentStatusByIdApiV1TestComponentStatusesIdGet$Params, context?: HttpContext): Observable<StrictHttpResponse<TestComponentStatus>> {
    return getTestComponentStatusByIdApiV1TestComponentStatusesIdGet(this.http, this.rootUrl, params, context);
  }

  /**
   * Get Test Component Status By Id.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getTestComponentStatusByIdApiV1TestComponentStatusesIdGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTestComponentStatusByIdApiV1TestComponentStatusesIdGet(params: GetTestComponentStatusByIdApiV1TestComponentStatusesIdGet$Params, context?: HttpContext): Observable<TestComponentStatus> {
    return this.getTestComponentStatusByIdApiV1TestComponentStatusesIdGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<TestComponentStatus>): TestComponentStatus => r.body)
    );
  }

  /** Path part for operation `updateTestComponentStatusApiV1TestComponentStatusesIdPut()` */
  static readonly UpdateTestComponentStatusApiV1TestComponentStatusesIdPutPath = '/api/v1/test-component-statuses/{id}';

  /**
   * Update Test Component Status.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateTestComponentStatusApiV1TestComponentStatusesIdPut()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateTestComponentStatusApiV1TestComponentStatusesIdPut$Response(params: UpdateTestComponentStatusApiV1TestComponentStatusesIdPut$Params, context?: HttpContext): Observable<StrictHttpResponse<TestComponentStatus>> {
    return updateTestComponentStatusApiV1TestComponentStatusesIdPut(this.http, this.rootUrl, params, context);
  }

  /**
   * Update Test Component Status.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateTestComponentStatusApiV1TestComponentStatusesIdPut$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateTestComponentStatusApiV1TestComponentStatusesIdPut(params: UpdateTestComponentStatusApiV1TestComponentStatusesIdPut$Params, context?: HttpContext): Observable<TestComponentStatus> {
    return this.updateTestComponentStatusApiV1TestComponentStatusesIdPut$Response(params, context).pipe(
      map((r: StrictHttpResponse<TestComponentStatus>): TestComponentStatus => r.body)
    );
  }

  /** Path part for operation `deleteTestComponentStatusApiV1TestComponentStatusesIdDelete()` */
  static readonly DeleteTestComponentStatusApiV1TestComponentStatusesIdDeletePath = '/api/v1/test-component-statuses/{id}';

  /**
   * Delete Test Component Status.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteTestComponentStatusApiV1TestComponentStatusesIdDelete()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteTestComponentStatusApiV1TestComponentStatusesIdDelete$Response(params: DeleteTestComponentStatusApiV1TestComponentStatusesIdDelete$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
    return deleteTestComponentStatusApiV1TestComponentStatusesIdDelete(this.http, this.rootUrl, params, context);
  }

  /**
   * Delete Test Component Status.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteTestComponentStatusApiV1TestComponentStatusesIdDelete$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteTestComponentStatusApiV1TestComponentStatusesIdDelete(params: DeleteTestComponentStatusApiV1TestComponentStatusesIdDelete$Params, context?: HttpContext): Observable<any> {
    return this.deleteTestComponentStatusApiV1TestComponentStatusesIdDelete$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>): any => r.body)
    );
  }

}
