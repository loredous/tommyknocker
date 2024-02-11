/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { createResultApiV1ResultsPost } from '../fn/results/create-result-api-v-1-results-post';
import { CreateResultApiV1ResultsPost$Params } from '../fn/results/create-result-api-v-1-results-post';
import { deleteResultApiV1ResultsIdDelete } from '../fn/results/delete-result-api-v-1-results-id-delete';
import { DeleteResultApiV1ResultsIdDelete$Params } from '../fn/results/delete-result-api-v-1-results-id-delete';
import { getResultByIdApiV1ResultsIdGet } from '../fn/results/get-result-by-id-api-v-1-results-id-get';
import { GetResultByIdApiV1ResultsIdGet$Params } from '../fn/results/get-result-by-id-api-v-1-results-id-get';
import { listResultsApiV1ResultsGet } from '../fn/results/list-results-api-v-1-results-get';
import { ListResultsApiV1ResultsGet$Params } from '../fn/results/list-results-api-v-1-results-get';
import { Result } from '../models/result';
import { updateResultApiV1ResultsIdPut } from '../fn/results/update-result-api-v-1-results-id-put';
import { UpdateResultApiV1ResultsIdPut$Params } from '../fn/results/update-result-api-v-1-results-id-put';

@Injectable({ providedIn: 'root' })
export class ResultsService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `listResultsApiV1ResultsGet()` */
  static readonly ListResultsApiV1ResultsGetPath = '/api/v1/results';

  /**
   * List Results.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `listResultsApiV1ResultsGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  listResultsApiV1ResultsGet$Response(params?: ListResultsApiV1ResultsGet$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Result>>> {
    return listResultsApiV1ResultsGet(this.http, this.rootUrl, params, context);
  }

  /**
   * List Results.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `listResultsApiV1ResultsGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  listResultsApiV1ResultsGet(params?: ListResultsApiV1ResultsGet$Params, context?: HttpContext): Observable<Array<Result>> {
    return this.listResultsApiV1ResultsGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Result>>): Array<Result> => r.body)
    );
  }

  /** Path part for operation `createResultApiV1ResultsPost()` */
  static readonly CreateResultApiV1ResultsPostPath = '/api/v1/results';

  /**
   * Create Result.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createResultApiV1ResultsPost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createResultApiV1ResultsPost$Response(params: CreateResultApiV1ResultsPost$Params, context?: HttpContext): Observable<StrictHttpResponse<Result>> {
    return createResultApiV1ResultsPost(this.http, this.rootUrl, params, context);
  }

  /**
   * Create Result.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createResultApiV1ResultsPost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createResultApiV1ResultsPost(params: CreateResultApiV1ResultsPost$Params, context?: HttpContext): Observable<Result> {
    return this.createResultApiV1ResultsPost$Response(params, context).pipe(
      map((r: StrictHttpResponse<Result>): Result => r.body)
    );
  }

  /** Path part for operation `getResultByIdApiV1ResultsIdGet()` */
  static readonly GetResultByIdApiV1ResultsIdGetPath = '/api/v1/results/{id}';

  /**
   * Get Result By Id.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getResultByIdApiV1ResultsIdGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  getResultByIdApiV1ResultsIdGet$Response(params: GetResultByIdApiV1ResultsIdGet$Params, context?: HttpContext): Observable<StrictHttpResponse<Result>> {
    return getResultByIdApiV1ResultsIdGet(this.http, this.rootUrl, params, context);
  }

  /**
   * Get Result By Id.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getResultByIdApiV1ResultsIdGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getResultByIdApiV1ResultsIdGet(params: GetResultByIdApiV1ResultsIdGet$Params, context?: HttpContext): Observable<Result> {
    return this.getResultByIdApiV1ResultsIdGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<Result>): Result => r.body)
    );
  }

  /** Path part for operation `updateResultApiV1ResultsIdPut()` */
  static readonly UpdateResultApiV1ResultsIdPutPath = '/api/v1/results/{id}';

  /**
   * Update Result.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateResultApiV1ResultsIdPut()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateResultApiV1ResultsIdPut$Response(params: UpdateResultApiV1ResultsIdPut$Params, context?: HttpContext): Observable<StrictHttpResponse<Result>> {
    return updateResultApiV1ResultsIdPut(this.http, this.rootUrl, params, context);
  }

  /**
   * Update Result.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateResultApiV1ResultsIdPut$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateResultApiV1ResultsIdPut(params: UpdateResultApiV1ResultsIdPut$Params, context?: HttpContext): Observable<Result> {
    return this.updateResultApiV1ResultsIdPut$Response(params, context).pipe(
      map((r: StrictHttpResponse<Result>): Result => r.body)
    );
  }

  /** Path part for operation `deleteResultApiV1ResultsIdDelete()` */
  static readonly DeleteResultApiV1ResultsIdDeletePath = '/api/v1/results/{id}';

  /**
   * Delete Result.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteResultApiV1ResultsIdDelete()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteResultApiV1ResultsIdDelete$Response(params: DeleteResultApiV1ResultsIdDelete$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
    return deleteResultApiV1ResultsIdDelete(this.http, this.rootUrl, params, context);
  }

  /**
   * Delete Result.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteResultApiV1ResultsIdDelete$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteResultApiV1ResultsIdDelete(params: DeleteResultApiV1ResultsIdDelete$Params, context?: HttpContext): Observable<any> {
    return this.deleteResultApiV1ResultsIdDelete$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>): any => r.body)
    );
  }

}
