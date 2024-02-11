/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { createRunnerApiV1RunnersPost } from '../fn/runners/create-runner-api-v-1-runners-post';
import { CreateRunnerApiV1RunnersPost$Params } from '../fn/runners/create-runner-api-v-1-runners-post';
import { deleteRunnerApiV1RunnersIdDelete } from '../fn/runners/delete-runner-api-v-1-runners-id-delete';
import { DeleteRunnerApiV1RunnersIdDelete$Params } from '../fn/runners/delete-runner-api-v-1-runners-id-delete';
import { getRunnerByIdApiV1RunnersIdGet } from '../fn/runners/get-runner-by-id-api-v-1-runners-id-get';
import { GetRunnerByIdApiV1RunnersIdGet$Params } from '../fn/runners/get-runner-by-id-api-v-1-runners-id-get';
import { listRunnersApiV1RunnersGet } from '../fn/runners/list-runners-api-v-1-runners-get';
import { ListRunnersApiV1RunnersGet$Params } from '../fn/runners/list-runners-api-v-1-runners-get';
import { Runner } from '../models/runner';
import { updateRunnerApiV1RunnersIdPut } from '../fn/runners/update-runner-api-v-1-runners-id-put';
import { UpdateRunnerApiV1RunnersIdPut$Params } from '../fn/runners/update-runner-api-v-1-runners-id-put';

@Injectable({ providedIn: 'root' })
export class RunnersService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `listRunnersApiV1RunnersGet()` */
  static readonly ListRunnersApiV1RunnersGetPath = '/api/v1/runners';

  /**
   * List Runners.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `listRunnersApiV1RunnersGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  listRunnersApiV1RunnersGet$Response(params?: ListRunnersApiV1RunnersGet$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Runner>>> {
    return listRunnersApiV1RunnersGet(this.http, this.rootUrl, params, context);
  }

  /**
   * List Runners.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `listRunnersApiV1RunnersGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  listRunnersApiV1RunnersGet(params?: ListRunnersApiV1RunnersGet$Params, context?: HttpContext): Observable<Array<Runner>> {
    return this.listRunnersApiV1RunnersGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Runner>>): Array<Runner> => r.body)
    );
  }

  /** Path part for operation `createRunnerApiV1RunnersPost()` */
  static readonly CreateRunnerApiV1RunnersPostPath = '/api/v1/runners';

  /**
   * Create Runner.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createRunnerApiV1RunnersPost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createRunnerApiV1RunnersPost$Response(params: CreateRunnerApiV1RunnersPost$Params, context?: HttpContext): Observable<StrictHttpResponse<Runner>> {
    return createRunnerApiV1RunnersPost(this.http, this.rootUrl, params, context);
  }

  /**
   * Create Runner.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createRunnerApiV1RunnersPost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createRunnerApiV1RunnersPost(params: CreateRunnerApiV1RunnersPost$Params, context?: HttpContext): Observable<Runner> {
    return this.createRunnerApiV1RunnersPost$Response(params, context).pipe(
      map((r: StrictHttpResponse<Runner>): Runner => r.body)
    );
  }

  /** Path part for operation `getRunnerByIdApiV1RunnersIdGet()` */
  static readonly GetRunnerByIdApiV1RunnersIdGetPath = '/api/v1/runners/{id}';

  /**
   * Get Runner By Id.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getRunnerByIdApiV1RunnersIdGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  getRunnerByIdApiV1RunnersIdGet$Response(params: GetRunnerByIdApiV1RunnersIdGet$Params, context?: HttpContext): Observable<StrictHttpResponse<Runner>> {
    return getRunnerByIdApiV1RunnersIdGet(this.http, this.rootUrl, params, context);
  }

  /**
   * Get Runner By Id.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getRunnerByIdApiV1RunnersIdGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getRunnerByIdApiV1RunnersIdGet(params: GetRunnerByIdApiV1RunnersIdGet$Params, context?: HttpContext): Observable<Runner> {
    return this.getRunnerByIdApiV1RunnersIdGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<Runner>): Runner => r.body)
    );
  }

  /** Path part for operation `updateRunnerApiV1RunnersIdPut()` */
  static readonly UpdateRunnerApiV1RunnersIdPutPath = '/api/v1/runners/{id}';

  /**
   * Update Runner.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateRunnerApiV1RunnersIdPut()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateRunnerApiV1RunnersIdPut$Response(params: UpdateRunnerApiV1RunnersIdPut$Params, context?: HttpContext): Observable<StrictHttpResponse<Runner>> {
    return updateRunnerApiV1RunnersIdPut(this.http, this.rootUrl, params, context);
  }

  /**
   * Update Runner.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateRunnerApiV1RunnersIdPut$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateRunnerApiV1RunnersIdPut(params: UpdateRunnerApiV1RunnersIdPut$Params, context?: HttpContext): Observable<Runner> {
    return this.updateRunnerApiV1RunnersIdPut$Response(params, context).pipe(
      map((r: StrictHttpResponse<Runner>): Runner => r.body)
    );
  }

  /** Path part for operation `deleteRunnerApiV1RunnersIdDelete()` */
  static readonly DeleteRunnerApiV1RunnersIdDeletePath = '/api/v1/runners/{id}';

  /**
   * Delete Runner.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteRunnerApiV1RunnersIdDelete()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteRunnerApiV1RunnersIdDelete$Response(params: DeleteRunnerApiV1RunnersIdDelete$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
    return deleteRunnerApiV1RunnersIdDelete(this.http, this.rootUrl, params, context);
  }

  /**
   * Delete Runner.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteRunnerApiV1RunnersIdDelete$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteRunnerApiV1RunnersIdDelete(params: DeleteRunnerApiV1RunnersIdDelete$Params, context?: HttpContext): Observable<any> {
    return this.deleteRunnerApiV1RunnersIdDelete$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>): any => r.body)
    );
  }

}
