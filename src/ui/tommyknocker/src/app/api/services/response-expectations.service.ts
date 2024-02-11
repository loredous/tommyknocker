/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { createResponseExpectationApiV1ResponseExpectationsPost } from '../fn/response-expectations/create-response-expectation-api-v-1-response-expectations-post';
import { CreateResponseExpectationApiV1ResponseExpectationsPost$Params } from '../fn/response-expectations/create-response-expectation-api-v-1-response-expectations-post';
import { deleteResponseExpectationApiV1ResponseExpectationsIdDelete } from '../fn/response-expectations/delete-response-expectation-api-v-1-response-expectations-id-delete';
import { DeleteResponseExpectationApiV1ResponseExpectationsIdDelete$Params } from '../fn/response-expectations/delete-response-expectation-api-v-1-response-expectations-id-delete';
import { getResponseExpectationByIdApiV1ResponseExpectationsIdGet } from '../fn/response-expectations/get-response-expectation-by-id-api-v-1-response-expectations-id-get';
import { GetResponseExpectationByIdApiV1ResponseExpectationsIdGet$Params } from '../fn/response-expectations/get-response-expectation-by-id-api-v-1-response-expectations-id-get';
import { listResponseExpectationsApiV1ResponseExpectationsGet } from '../fn/response-expectations/list-response-expectations-api-v-1-response-expectations-get';
import { ListResponseExpectationsApiV1ResponseExpectationsGet$Params } from '../fn/response-expectations/list-response-expectations-api-v-1-response-expectations-get';
import { ResponseExpectation } from '../models/response-expectation';
import { updateResponseExpectationApiV1ResponseExpectationsIdPut } from '../fn/response-expectations/update-response-expectation-api-v-1-response-expectations-id-put';
import { UpdateResponseExpectationApiV1ResponseExpectationsIdPut$Params } from '../fn/response-expectations/update-response-expectation-api-v-1-response-expectations-id-put';

@Injectable({ providedIn: 'root' })
export class ResponseExpectationsService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `listResponseExpectationsApiV1ResponseExpectationsGet()` */
  static readonly ListResponseExpectationsApiV1ResponseExpectationsGetPath = '/api/v1/response-expectations';

  /**
   * List Response Expectations.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `listResponseExpectationsApiV1ResponseExpectationsGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  listResponseExpectationsApiV1ResponseExpectationsGet$Response(params?: ListResponseExpectationsApiV1ResponseExpectationsGet$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ResponseExpectation>>> {
    return listResponseExpectationsApiV1ResponseExpectationsGet(this.http, this.rootUrl, params, context);
  }

  /**
   * List Response Expectations.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `listResponseExpectationsApiV1ResponseExpectationsGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  listResponseExpectationsApiV1ResponseExpectationsGet(params?: ListResponseExpectationsApiV1ResponseExpectationsGet$Params, context?: HttpContext): Observable<Array<ResponseExpectation>> {
    return this.listResponseExpectationsApiV1ResponseExpectationsGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<ResponseExpectation>>): Array<ResponseExpectation> => r.body)
    );
  }

  /** Path part for operation `createResponseExpectationApiV1ResponseExpectationsPost()` */
  static readonly CreateResponseExpectationApiV1ResponseExpectationsPostPath = '/api/v1/response-expectations';

  /**
   * Create Response Expectation.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createResponseExpectationApiV1ResponseExpectationsPost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createResponseExpectationApiV1ResponseExpectationsPost$Response(params: CreateResponseExpectationApiV1ResponseExpectationsPost$Params, context?: HttpContext): Observable<StrictHttpResponse<ResponseExpectation>> {
    return createResponseExpectationApiV1ResponseExpectationsPost(this.http, this.rootUrl, params, context);
  }

  /**
   * Create Response Expectation.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createResponseExpectationApiV1ResponseExpectationsPost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createResponseExpectationApiV1ResponseExpectationsPost(params: CreateResponseExpectationApiV1ResponseExpectationsPost$Params, context?: HttpContext): Observable<ResponseExpectation> {
    return this.createResponseExpectationApiV1ResponseExpectationsPost$Response(params, context).pipe(
      map((r: StrictHttpResponse<ResponseExpectation>): ResponseExpectation => r.body)
    );
  }

  /** Path part for operation `getResponseExpectationByIdApiV1ResponseExpectationsIdGet()` */
  static readonly GetResponseExpectationByIdApiV1ResponseExpectationsIdGetPath = '/api/v1/response-expectations/{id}';

  /**
   * Get Response Expectation By Id.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getResponseExpectationByIdApiV1ResponseExpectationsIdGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  getResponseExpectationByIdApiV1ResponseExpectationsIdGet$Response(params: GetResponseExpectationByIdApiV1ResponseExpectationsIdGet$Params, context?: HttpContext): Observable<StrictHttpResponse<ResponseExpectation>> {
    return getResponseExpectationByIdApiV1ResponseExpectationsIdGet(this.http, this.rootUrl, params, context);
  }

  /**
   * Get Response Expectation By Id.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getResponseExpectationByIdApiV1ResponseExpectationsIdGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getResponseExpectationByIdApiV1ResponseExpectationsIdGet(params: GetResponseExpectationByIdApiV1ResponseExpectationsIdGet$Params, context?: HttpContext): Observable<ResponseExpectation> {
    return this.getResponseExpectationByIdApiV1ResponseExpectationsIdGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<ResponseExpectation>): ResponseExpectation => r.body)
    );
  }

  /** Path part for operation `updateResponseExpectationApiV1ResponseExpectationsIdPut()` */
  static readonly UpdateResponseExpectationApiV1ResponseExpectationsIdPutPath = '/api/v1/response-expectations/{id}';

  /**
   * Update Response Expectation.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateResponseExpectationApiV1ResponseExpectationsIdPut()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateResponseExpectationApiV1ResponseExpectationsIdPut$Response(params: UpdateResponseExpectationApiV1ResponseExpectationsIdPut$Params, context?: HttpContext): Observable<StrictHttpResponse<ResponseExpectation>> {
    return updateResponseExpectationApiV1ResponseExpectationsIdPut(this.http, this.rootUrl, params, context);
  }

  /**
   * Update Response Expectation.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateResponseExpectationApiV1ResponseExpectationsIdPut$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateResponseExpectationApiV1ResponseExpectationsIdPut(params: UpdateResponseExpectationApiV1ResponseExpectationsIdPut$Params, context?: HttpContext): Observable<ResponseExpectation> {
    return this.updateResponseExpectationApiV1ResponseExpectationsIdPut$Response(params, context).pipe(
      map((r: StrictHttpResponse<ResponseExpectation>): ResponseExpectation => r.body)
    );
  }

  /** Path part for operation `deleteResponseExpectationApiV1ResponseExpectationsIdDelete()` */
  static readonly DeleteResponseExpectationApiV1ResponseExpectationsIdDeletePath = '/api/v1/response-expectations/{id}';

  /**
   * Delete Response Expectation.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteResponseExpectationApiV1ResponseExpectationsIdDelete()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteResponseExpectationApiV1ResponseExpectationsIdDelete$Response(params: DeleteResponseExpectationApiV1ResponseExpectationsIdDelete$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
    return deleteResponseExpectationApiV1ResponseExpectationsIdDelete(this.http, this.rootUrl, params, context);
  }

  /**
   * Delete Response Expectation.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteResponseExpectationApiV1ResponseExpectationsIdDelete$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteResponseExpectationApiV1ResponseExpectationsIdDelete(params: DeleteResponseExpectationApiV1ResponseExpectationsIdDelete$Params, context?: HttpContext): Observable<any> {
    return this.deleteResponseExpectationApiV1ResponseExpectationsIdDelete$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>): any => r.body)
    );
  }

}
