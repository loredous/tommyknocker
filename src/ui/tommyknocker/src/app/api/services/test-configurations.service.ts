/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { createTestConfigurationApiV1TestConfigurationsPost } from '../fn/test-configurations/create-test-configuration-api-v-1-test-configurations-post';
import { CreateTestConfigurationApiV1TestConfigurationsPost$Params } from '../fn/test-configurations/create-test-configuration-api-v-1-test-configurations-post';
import { deleteTestConfigurationApiV1TestConfigurationsIdDelete } from '../fn/test-configurations/delete-test-configuration-api-v-1-test-configurations-id-delete';
import { DeleteTestConfigurationApiV1TestConfigurationsIdDelete$Params } from '../fn/test-configurations/delete-test-configuration-api-v-1-test-configurations-id-delete';
import { getTestConfigurationByIdApiV1TestConfigurationsIdGet } from '../fn/test-configurations/get-test-configuration-by-id-api-v-1-test-configurations-id-get';
import { GetTestConfigurationByIdApiV1TestConfigurationsIdGet$Params } from '../fn/test-configurations/get-test-configuration-by-id-api-v-1-test-configurations-id-get';
import { listTestConfigurationsApiV1TestConfigurationsGet } from '../fn/test-configurations/list-test-configurations-api-v-1-test-configurations-get';
import { ListTestConfigurationsApiV1TestConfigurationsGet$Params } from '../fn/test-configurations/list-test-configurations-api-v-1-test-configurations-get';
import { TestConfiguration } from '../models/test-configuration';
import { updateTestConfigurationApiV1TestConfigurationsIdPut } from '../fn/test-configurations/update-test-configuration-api-v-1-test-configurations-id-put';
import { UpdateTestConfigurationApiV1TestConfigurationsIdPut$Params } from '../fn/test-configurations/update-test-configuration-api-v-1-test-configurations-id-put';

@Injectable({ providedIn: 'root' })
export class TestConfigurationsService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `listTestConfigurationsApiV1TestConfigurationsGet()` */
  static readonly ListTestConfigurationsApiV1TestConfigurationsGetPath = '/api/v1/test-configurations';

  /**
   * List Test Configurations.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `listTestConfigurationsApiV1TestConfigurationsGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  listTestConfigurationsApiV1TestConfigurationsGet$Response(params?: ListTestConfigurationsApiV1TestConfigurationsGet$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<TestConfiguration>>> {
    return listTestConfigurationsApiV1TestConfigurationsGet(this.http, this.rootUrl, params, context);
  }

  /**
   * List Test Configurations.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `listTestConfigurationsApiV1TestConfigurationsGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  listTestConfigurationsApiV1TestConfigurationsGet(params?: ListTestConfigurationsApiV1TestConfigurationsGet$Params, context?: HttpContext): Observable<Array<TestConfiguration>> {
    return this.listTestConfigurationsApiV1TestConfigurationsGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<TestConfiguration>>): Array<TestConfiguration> => r.body)
    );
  }

  /** Path part for operation `createTestConfigurationApiV1TestConfigurationsPost()` */
  static readonly CreateTestConfigurationApiV1TestConfigurationsPostPath = '/api/v1/test-configurations';

  /**
   * Create Test Configuration.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createTestConfigurationApiV1TestConfigurationsPost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createTestConfigurationApiV1TestConfigurationsPost$Response(params: CreateTestConfigurationApiV1TestConfigurationsPost$Params, context?: HttpContext): Observable<StrictHttpResponse<TestConfiguration>> {
    return createTestConfigurationApiV1TestConfigurationsPost(this.http, this.rootUrl, params, context);
  }

  /**
   * Create Test Configuration.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createTestConfigurationApiV1TestConfigurationsPost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createTestConfigurationApiV1TestConfigurationsPost(params: CreateTestConfigurationApiV1TestConfigurationsPost$Params, context?: HttpContext): Observable<TestConfiguration> {
    return this.createTestConfigurationApiV1TestConfigurationsPost$Response(params, context).pipe(
      map((r: StrictHttpResponse<TestConfiguration>): TestConfiguration => r.body)
    );
  }

  /** Path part for operation `getTestConfigurationByIdApiV1TestConfigurationsIdGet()` */
  static readonly GetTestConfigurationByIdApiV1TestConfigurationsIdGetPath = '/api/v1/test-configurations/{id}';

  /**
   * Get Test Configuration By Id.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getTestConfigurationByIdApiV1TestConfigurationsIdGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTestConfigurationByIdApiV1TestConfigurationsIdGet$Response(params: GetTestConfigurationByIdApiV1TestConfigurationsIdGet$Params, context?: HttpContext): Observable<StrictHttpResponse<TestConfiguration>> {
    return getTestConfigurationByIdApiV1TestConfigurationsIdGet(this.http, this.rootUrl, params, context);
  }

  /**
   * Get Test Configuration By Id.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getTestConfigurationByIdApiV1TestConfigurationsIdGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTestConfigurationByIdApiV1TestConfigurationsIdGet(params: GetTestConfigurationByIdApiV1TestConfigurationsIdGet$Params, context?: HttpContext): Observable<TestConfiguration> {
    return this.getTestConfigurationByIdApiV1TestConfigurationsIdGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<TestConfiguration>): TestConfiguration => r.body)
    );
  }

  /** Path part for operation `updateTestConfigurationApiV1TestConfigurationsIdPut()` */
  static readonly UpdateTestConfigurationApiV1TestConfigurationsIdPutPath = '/api/v1/test-configurations/{id}';

  /**
   * Update Test Configuration.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateTestConfigurationApiV1TestConfigurationsIdPut()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateTestConfigurationApiV1TestConfigurationsIdPut$Response(params: UpdateTestConfigurationApiV1TestConfigurationsIdPut$Params, context?: HttpContext): Observable<StrictHttpResponse<TestConfiguration>> {
    return updateTestConfigurationApiV1TestConfigurationsIdPut(this.http, this.rootUrl, params, context);
  }

  /**
   * Update Test Configuration.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateTestConfigurationApiV1TestConfigurationsIdPut$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateTestConfigurationApiV1TestConfigurationsIdPut(params: UpdateTestConfigurationApiV1TestConfigurationsIdPut$Params, context?: HttpContext): Observable<TestConfiguration> {
    return this.updateTestConfigurationApiV1TestConfigurationsIdPut$Response(params, context).pipe(
      map((r: StrictHttpResponse<TestConfiguration>): TestConfiguration => r.body)
    );
  }

  /** Path part for operation `deleteTestConfigurationApiV1TestConfigurationsIdDelete()` */
  static readonly DeleteTestConfigurationApiV1TestConfigurationsIdDeletePath = '/api/v1/test-configurations/{id}';

  /**
   * Delete Test Configuration.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteTestConfigurationApiV1TestConfigurationsIdDelete()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteTestConfigurationApiV1TestConfigurationsIdDelete$Response(params: DeleteTestConfigurationApiV1TestConfigurationsIdDelete$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
    return deleteTestConfigurationApiV1TestConfigurationsIdDelete(this.http, this.rootUrl, params, context);
  }

  /**
   * Delete Test Configuration.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteTestConfigurationApiV1TestConfigurationsIdDelete$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteTestConfigurationApiV1TestConfigurationsIdDelete(params: DeleteTestConfigurationApiV1TestConfigurationsIdDelete$Params, context?: HttpContext): Observable<any> {
    return this.deleteTestConfigurationApiV1TestConfigurationsIdDelete$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>): any => r.body)
    );
  }

}
