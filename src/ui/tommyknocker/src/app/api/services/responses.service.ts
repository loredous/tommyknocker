/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { createResponseApiV1ResponsesPost } from '../fn/responses/create-response-api-v-1-responses-post';
import { CreateResponseApiV1ResponsesPost$Params } from '../fn/responses/create-response-api-v-1-responses-post';
import { deleteResponseApiV1ResponsesIdDelete } from '../fn/responses/delete-response-api-v-1-responses-id-delete';
import { DeleteResponseApiV1ResponsesIdDelete$Params } from '../fn/responses/delete-response-api-v-1-responses-id-delete';
import { getResponseByIdApiV1ResponsesIdGet } from '../fn/responses/get-response-by-id-api-v-1-responses-id-get';
import { GetResponseByIdApiV1ResponsesIdGet$Params } from '../fn/responses/get-response-by-id-api-v-1-responses-id-get';
import { listResponsesApiV1ResponsesGet } from '../fn/responses/list-responses-api-v-1-responses-get';
import { ListResponsesApiV1ResponsesGet$Params } from '../fn/responses/list-responses-api-v-1-responses-get';
import { Response } from '../models/response';
import { updateResponseApiV1ResponsesIdPut } from '../fn/responses/update-response-api-v-1-responses-id-put';
import { UpdateResponseApiV1ResponsesIdPut$Params } from '../fn/responses/update-response-api-v-1-responses-id-put';

@Injectable({ providedIn: 'root' })
export class ResponsesService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `listResponsesApiV1ResponsesGet()` */
  static readonly ListResponsesApiV1ResponsesGetPath = '/api/v1/responses';

  /**
   * List Responses.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `listResponsesApiV1ResponsesGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  listResponsesApiV1ResponsesGet$Response(params?: ListResponsesApiV1ResponsesGet$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Response>>> {
    return listResponsesApiV1ResponsesGet(this.http, this.rootUrl, params, context);
  }

  /**
   * List Responses.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `listResponsesApiV1ResponsesGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  listResponsesApiV1ResponsesGet(params?: ListResponsesApiV1ResponsesGet$Params, context?: HttpContext): Observable<Array<Response>> {
    return this.listResponsesApiV1ResponsesGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Response>>): Array<Response> => r.body)
    );
  }

  /** Path part for operation `createResponseApiV1ResponsesPost()` */
  static readonly CreateResponseApiV1ResponsesPostPath = '/api/v1/responses';

  /**
   * Create Response.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createResponseApiV1ResponsesPost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createResponseApiV1ResponsesPost$Response(params: CreateResponseApiV1ResponsesPost$Params, context?: HttpContext): Observable<StrictHttpResponse<Response>> {
    return createResponseApiV1ResponsesPost(this.http, this.rootUrl, params, context);
  }

  /**
   * Create Response.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createResponseApiV1ResponsesPost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createResponseApiV1ResponsesPost(params: CreateResponseApiV1ResponsesPost$Params, context?: HttpContext): Observable<Response> {
    return this.createResponseApiV1ResponsesPost$Response(params, context).pipe(
      map((r: StrictHttpResponse<Response>): Response => r.body)
    );
  }

  /** Path part for operation `getResponseByIdApiV1ResponsesIdGet()` */
  static readonly GetResponseByIdApiV1ResponsesIdGetPath = '/api/v1/responses/{id}';

  /**
   * Get Response By Id.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getResponseByIdApiV1ResponsesIdGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  getResponseByIdApiV1ResponsesIdGet$Response(params: GetResponseByIdApiV1ResponsesIdGet$Params, context?: HttpContext): Observable<StrictHttpResponse<Response>> {
    return getResponseByIdApiV1ResponsesIdGet(this.http, this.rootUrl, params, context);
  }

  /**
   * Get Response By Id.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getResponseByIdApiV1ResponsesIdGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getResponseByIdApiV1ResponsesIdGet(params: GetResponseByIdApiV1ResponsesIdGet$Params, context?: HttpContext): Observable<Response> {
    return this.getResponseByIdApiV1ResponsesIdGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<Response>): Response => r.body)
    );
  }

  /** Path part for operation `updateResponseApiV1ResponsesIdPut()` */
  static readonly UpdateResponseApiV1ResponsesIdPutPath = '/api/v1/responses/{id}';

  /**
   * Update Response.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateResponseApiV1ResponsesIdPut()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateResponseApiV1ResponsesIdPut$Response(params: UpdateResponseApiV1ResponsesIdPut$Params, context?: HttpContext): Observable<StrictHttpResponse<Response>> {
    return updateResponseApiV1ResponsesIdPut(this.http, this.rootUrl, params, context);
  }

  /**
   * Update Response.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateResponseApiV1ResponsesIdPut$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateResponseApiV1ResponsesIdPut(params: UpdateResponseApiV1ResponsesIdPut$Params, context?: HttpContext): Observable<Response> {
    return this.updateResponseApiV1ResponsesIdPut$Response(params, context).pipe(
      map((r: StrictHttpResponse<Response>): Response => r.body)
    );
  }

  /** Path part for operation `deleteResponseApiV1ResponsesIdDelete()` */
  static readonly DeleteResponseApiV1ResponsesIdDeletePath = '/api/v1/responses/{id}';

  /**
   * Delete Response.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteResponseApiV1ResponsesIdDelete()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteResponseApiV1ResponsesIdDelete$Response(params: DeleteResponseApiV1ResponsesIdDelete$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
    return deleteResponseApiV1ResponsesIdDelete(this.http, this.rootUrl, params, context);
  }

  /**
   * Delete Response.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteResponseApiV1ResponsesIdDelete$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteResponseApiV1ResponsesIdDelete(params: DeleteResponseApiV1ResponsesIdDelete$Params, context?: HttpContext): Observable<any> {
    return this.deleteResponseApiV1ResponsesIdDelete$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>): any => r.body)
    );
  }

}
