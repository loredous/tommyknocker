/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { createTestSuiteApiV1TestSuitesPost } from '../fn/test-suites/create-test-suite-api-v-1-test-suites-post';
import { CreateTestSuiteApiV1TestSuitesPost$Params } from '../fn/test-suites/create-test-suite-api-v-1-test-suites-post';
import { deleteTestSuiteApiV1TestSuitesIdDelete } from '../fn/test-suites/delete-test-suite-api-v-1-test-suites-id-delete';
import { DeleteTestSuiteApiV1TestSuitesIdDelete$Params } from '../fn/test-suites/delete-test-suite-api-v-1-test-suites-id-delete';
import { getTestSuiteByIdApiV1TestSuitesIdGet } from '../fn/test-suites/get-test-suite-by-id-api-v-1-test-suites-id-get';
import { GetTestSuiteByIdApiV1TestSuitesIdGet$Params } from '../fn/test-suites/get-test-suite-by-id-api-v-1-test-suites-id-get';
import { listTestSuitesApiV1TestSuitesGet } from '../fn/test-suites/list-test-suites-api-v-1-test-suites-get';
import { ListTestSuitesApiV1TestSuitesGet$Params } from '../fn/test-suites/list-test-suites-api-v-1-test-suites-get';
import { TestSuite } from '../models/test-suite';
import { updateTestSuiteApiV1TestSuitesIdPut } from '../fn/test-suites/update-test-suite-api-v-1-test-suites-id-put';
import { UpdateTestSuiteApiV1TestSuitesIdPut$Params } from '../fn/test-suites/update-test-suite-api-v-1-test-suites-id-put';

@Injectable({ providedIn: 'root' })
export class TestSuitesService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `listTestSuitesApiV1TestSuitesGet()` */
  static readonly ListTestSuitesApiV1TestSuitesGetPath = '/api/v1/test-suites';

  /**
   * List Test Suites.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `listTestSuitesApiV1TestSuitesGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  listTestSuitesApiV1TestSuitesGet$Response(params?: ListTestSuitesApiV1TestSuitesGet$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<TestSuite>>> {
    return listTestSuitesApiV1TestSuitesGet(this.http, this.rootUrl, params, context);
  }

  /**
   * List Test Suites.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `listTestSuitesApiV1TestSuitesGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  listTestSuitesApiV1TestSuitesGet(params?: ListTestSuitesApiV1TestSuitesGet$Params, context?: HttpContext): Observable<Array<TestSuite>> {
    return this.listTestSuitesApiV1TestSuitesGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<TestSuite>>): Array<TestSuite> => r.body)
    );
  }

  /** Path part for operation `createTestSuiteApiV1TestSuitesPost()` */
  static readonly CreateTestSuiteApiV1TestSuitesPostPath = '/api/v1/test-suites';

  /**
   * Create Test Suite.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createTestSuiteApiV1TestSuitesPost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createTestSuiteApiV1TestSuitesPost$Response(params: CreateTestSuiteApiV1TestSuitesPost$Params, context?: HttpContext): Observable<StrictHttpResponse<TestSuite>> {
    return createTestSuiteApiV1TestSuitesPost(this.http, this.rootUrl, params, context);
  }

  /**
   * Create Test Suite.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createTestSuiteApiV1TestSuitesPost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createTestSuiteApiV1TestSuitesPost(params: CreateTestSuiteApiV1TestSuitesPost$Params, context?: HttpContext): Observable<TestSuite> {
    return this.createTestSuiteApiV1TestSuitesPost$Response(params, context).pipe(
      map((r: StrictHttpResponse<TestSuite>): TestSuite => r.body)
    );
  }

  /** Path part for operation `getTestSuiteByIdApiV1TestSuitesIdGet()` */
  static readonly GetTestSuiteByIdApiV1TestSuitesIdGetPath = '/api/v1/test-suites/{id}';

  /**
   * Get Test Suite By Id.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getTestSuiteByIdApiV1TestSuitesIdGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTestSuiteByIdApiV1TestSuitesIdGet$Response(params: GetTestSuiteByIdApiV1TestSuitesIdGet$Params, context?: HttpContext): Observable<StrictHttpResponse<TestSuite>> {
    return getTestSuiteByIdApiV1TestSuitesIdGet(this.http, this.rootUrl, params, context);
  }

  /**
   * Get Test Suite By Id.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getTestSuiteByIdApiV1TestSuitesIdGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTestSuiteByIdApiV1TestSuitesIdGet(params: GetTestSuiteByIdApiV1TestSuitesIdGet$Params, context?: HttpContext): Observable<TestSuite> {
    return this.getTestSuiteByIdApiV1TestSuitesIdGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<TestSuite>): TestSuite => r.body)
    );
  }

  /** Path part for operation `updateTestSuiteApiV1TestSuitesIdPut()` */
  static readonly UpdateTestSuiteApiV1TestSuitesIdPutPath = '/api/v1/test-suites/{id}';

  /**
   * Update Test Suite.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateTestSuiteApiV1TestSuitesIdPut()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateTestSuiteApiV1TestSuitesIdPut$Response(params: UpdateTestSuiteApiV1TestSuitesIdPut$Params, context?: HttpContext): Observable<StrictHttpResponse<TestSuite>> {
    return updateTestSuiteApiV1TestSuitesIdPut(this.http, this.rootUrl, params, context);
  }

  /**
   * Update Test Suite.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateTestSuiteApiV1TestSuitesIdPut$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateTestSuiteApiV1TestSuitesIdPut(params: UpdateTestSuiteApiV1TestSuitesIdPut$Params, context?: HttpContext): Observable<TestSuite> {
    return this.updateTestSuiteApiV1TestSuitesIdPut$Response(params, context).pipe(
      map((r: StrictHttpResponse<TestSuite>): TestSuite => r.body)
    );
  }

  /** Path part for operation `deleteTestSuiteApiV1TestSuitesIdDelete()` */
  static readonly DeleteTestSuiteApiV1TestSuitesIdDeletePath = '/api/v1/test-suites/{id}';

  /**
   * Delete Test Suite.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteTestSuiteApiV1TestSuitesIdDelete()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteTestSuiteApiV1TestSuitesIdDelete$Response(params: DeleteTestSuiteApiV1TestSuitesIdDelete$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
    return deleteTestSuiteApiV1TestSuitesIdDelete(this.http, this.rootUrl, params, context);
  }

  /**
   * Delete Test Suite.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteTestSuiteApiV1TestSuitesIdDelete$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteTestSuiteApiV1TestSuitesIdDelete(params: DeleteTestSuiteApiV1TestSuitesIdDelete$Params, context?: HttpContext): Observable<any> {
    return this.deleteTestSuiteApiV1TestSuitesIdDelete$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>): any => r.body)
    );
  }

}
