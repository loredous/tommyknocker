/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { addTestComponentStatusApiV1TestsIdAddComponentStatusStatusIdPut } from '../fn/tests/add-test-component-status-api-v-1-tests-id-add-component-status-status-id-put';
import { AddTestComponentStatusApiV1TestsIdAddComponentStatusStatusIdPut$Params } from '../fn/tests/add-test-component-status-api-v-1-tests-id-add-component-status-status-id-put';
import { createTestApiV1TestsPost } from '../fn/tests/create-test-api-v-1-tests-post';
import { CreateTestApiV1TestsPost$Params } from '../fn/tests/create-test-api-v-1-tests-post';
import { deleteTestApiV1TestsIdDelete } from '../fn/tests/delete-test-api-v-1-tests-id-delete';
import { DeleteTestApiV1TestsIdDelete$Params } from '../fn/tests/delete-test-api-v-1-tests-id-delete';
import { getTestByIdApiV1TestsIdGet } from '../fn/tests/get-test-by-id-api-v-1-tests-id-get';
import { GetTestByIdApiV1TestsIdGet$Params } from '../fn/tests/get-test-by-id-api-v-1-tests-id-get';
import { listTestsApiV1TestsGet } from '../fn/tests/list-tests-api-v-1-tests-get';
import { ListTestsApiV1TestsGet$Params } from '../fn/tests/list-tests-api-v-1-tests-get';
import { Test } from '../models/test';

@Injectable({ providedIn: 'root' })
export class TestsService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `listTestsApiV1TestsGet()` */
  static readonly ListTestsApiV1TestsGetPath = '/api/v1/tests';

  /**
   * List Tests.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `listTestsApiV1TestsGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  listTestsApiV1TestsGet$Response(params?: ListTestsApiV1TestsGet$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Test>>> {
    return listTestsApiV1TestsGet(this.http, this.rootUrl, params, context);
  }

  /**
   * List Tests.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `listTestsApiV1TestsGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  listTestsApiV1TestsGet(params?: ListTestsApiV1TestsGet$Params, context?: HttpContext): Observable<Array<Test>> {
    return this.listTestsApiV1TestsGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Test>>): Array<Test> => r.body)
    );
  }

  /** Path part for operation `createTestApiV1TestsPost()` */
  static readonly CreateTestApiV1TestsPostPath = '/api/v1/tests';

  /**
   * Create Test.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createTestApiV1TestsPost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createTestApiV1TestsPost$Response(params: CreateTestApiV1TestsPost$Params, context?: HttpContext): Observable<StrictHttpResponse<Test>> {
    return createTestApiV1TestsPost(this.http, this.rootUrl, params, context);
  }

  /**
   * Create Test.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createTestApiV1TestsPost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createTestApiV1TestsPost(params: CreateTestApiV1TestsPost$Params, context?: HttpContext): Observable<Test> {
    return this.createTestApiV1TestsPost$Response(params, context).pipe(
      map((r: StrictHttpResponse<Test>): Test => r.body)
    );
  }

  /** Path part for operation `getTestByIdApiV1TestsIdGet()` */
  static readonly GetTestByIdApiV1TestsIdGetPath = '/api/v1/tests/{id}';

  /**
   * Get Test By Id.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getTestByIdApiV1TestsIdGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTestByIdApiV1TestsIdGet$Response(params: GetTestByIdApiV1TestsIdGet$Params, context?: HttpContext): Observable<StrictHttpResponse<Test>> {
    return getTestByIdApiV1TestsIdGet(this.http, this.rootUrl, params, context);
  }

  /**
   * Get Test By Id.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getTestByIdApiV1TestsIdGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTestByIdApiV1TestsIdGet(params: GetTestByIdApiV1TestsIdGet$Params, context?: HttpContext): Observable<Test> {
    return this.getTestByIdApiV1TestsIdGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<Test>): Test => r.body)
    );
  }

  /** Path part for operation `deleteTestApiV1TestsIdDelete()` */
  static readonly DeleteTestApiV1TestsIdDeletePath = '/api/v1/tests/{id}';

  /**
   * Delete Test.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteTestApiV1TestsIdDelete()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteTestApiV1TestsIdDelete$Response(params: DeleteTestApiV1TestsIdDelete$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
    return deleteTestApiV1TestsIdDelete(this.http, this.rootUrl, params, context);
  }

  /**
   * Delete Test.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteTestApiV1TestsIdDelete$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteTestApiV1TestsIdDelete(params: DeleteTestApiV1TestsIdDelete$Params, context?: HttpContext): Observable<any> {
    return this.deleteTestApiV1TestsIdDelete$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>): any => r.body)
    );
  }

  /** Path part for operation `addTestComponentStatusApiV1TestsIdAddComponentStatusStatusIdPut()` */
  static readonly AddTestComponentStatusApiV1TestsIdAddComponentStatusStatusIdPutPath = '/api/v1/tests/{id}/add_component_status/{status_id}';

  /**
   * Add Test Component Status.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addTestComponentStatusApiV1TestsIdAddComponentStatusStatusIdPut()` instead.
   *
   * This method doesn't expect any request body.
   */
  addTestComponentStatusApiV1TestsIdAddComponentStatusStatusIdPut$Response(params: AddTestComponentStatusApiV1TestsIdAddComponentStatusStatusIdPut$Params, context?: HttpContext): Observable<StrictHttpResponse<Test>> {
    return addTestComponentStatusApiV1TestsIdAddComponentStatusStatusIdPut(this.http, this.rootUrl, params, context);
  }

  /**
   * Add Test Component Status.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `addTestComponentStatusApiV1TestsIdAddComponentStatusStatusIdPut$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  addTestComponentStatusApiV1TestsIdAddComponentStatusStatusIdPut(params: AddTestComponentStatusApiV1TestsIdAddComponentStatusStatusIdPut$Params, context?: HttpContext): Observable<Test> {
    return this.addTestComponentStatusApiV1TestsIdAddComponentStatusStatusIdPut$Response(params, context).pipe(
      map((r: StrictHttpResponse<Test>): Test => r.body)
    );
  }

}
