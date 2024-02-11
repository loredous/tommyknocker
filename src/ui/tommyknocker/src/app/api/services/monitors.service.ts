/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { createMonitorApiV1MonitorsPost } from '../fn/monitors/create-monitor-api-v-1-monitors-post';
import { CreateMonitorApiV1MonitorsPost$Params } from '../fn/monitors/create-monitor-api-v-1-monitors-post';
import { deleteMonitorApiV1MonitorsIdDelete } from '../fn/monitors/delete-monitor-api-v-1-monitors-id-delete';
import { DeleteMonitorApiV1MonitorsIdDelete$Params } from '../fn/monitors/delete-monitor-api-v-1-monitors-id-delete';
import { getMonitorByIdApiV1MonitorsIdGet } from '../fn/monitors/get-monitor-by-id-api-v-1-monitors-id-get';
import { GetMonitorByIdApiV1MonitorsIdGet$Params } from '../fn/monitors/get-monitor-by-id-api-v-1-monitors-id-get';
import { listMonitorsApiV1MonitorsGet } from '../fn/monitors/list-monitors-api-v-1-monitors-get';
import { ListMonitorsApiV1MonitorsGet$Params } from '../fn/monitors/list-monitors-api-v-1-monitors-get';
import { Monitor } from '../models/monitor';
import { updateMonitorApiV1MonitorsIdPut } from '../fn/monitors/update-monitor-api-v-1-monitors-id-put';
import { UpdateMonitorApiV1MonitorsIdPut$Params } from '../fn/monitors/update-monitor-api-v-1-monitors-id-put';

@Injectable({ providedIn: 'root' })
export class MonitorsService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `listMonitorsApiV1MonitorsGet()` */
  static readonly ListMonitorsApiV1MonitorsGetPath = '/api/v1/monitors';

  /**
   * List Monitors.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `listMonitorsApiV1MonitorsGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  listMonitorsApiV1MonitorsGet$Response(params?: ListMonitorsApiV1MonitorsGet$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Monitor>>> {
    return listMonitorsApiV1MonitorsGet(this.http, this.rootUrl, params, context);
  }

  /**
   * List Monitors.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `listMonitorsApiV1MonitorsGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  listMonitorsApiV1MonitorsGet(params?: ListMonitorsApiV1MonitorsGet$Params, context?: HttpContext): Observable<Array<Monitor>> {
    return this.listMonitorsApiV1MonitorsGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Monitor>>): Array<Monitor> => r.body)
    );
  }

  /** Path part for operation `createMonitorApiV1MonitorsPost()` */
  static readonly CreateMonitorApiV1MonitorsPostPath = '/api/v1/monitors';

  /**
   * Create Monitor.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createMonitorApiV1MonitorsPost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createMonitorApiV1MonitorsPost$Response(params: CreateMonitorApiV1MonitorsPost$Params, context?: HttpContext): Observable<StrictHttpResponse<Monitor>> {
    return createMonitorApiV1MonitorsPost(this.http, this.rootUrl, params, context);
  }

  /**
   * Create Monitor.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createMonitorApiV1MonitorsPost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createMonitorApiV1MonitorsPost(params: CreateMonitorApiV1MonitorsPost$Params, context?: HttpContext): Observable<Monitor> {
    return this.createMonitorApiV1MonitorsPost$Response(params, context).pipe(
      map((r: StrictHttpResponse<Monitor>): Monitor => r.body)
    );
  }

  /** Path part for operation `getMonitorByIdApiV1MonitorsIdGet()` */
  static readonly GetMonitorByIdApiV1MonitorsIdGetPath = '/api/v1/monitors/{id}';

  /**
   * Get Monitor By Id.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getMonitorByIdApiV1MonitorsIdGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  getMonitorByIdApiV1MonitorsIdGet$Response(params: GetMonitorByIdApiV1MonitorsIdGet$Params, context?: HttpContext): Observable<StrictHttpResponse<Monitor>> {
    return getMonitorByIdApiV1MonitorsIdGet(this.http, this.rootUrl, params, context);
  }

  /**
   * Get Monitor By Id.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getMonitorByIdApiV1MonitorsIdGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getMonitorByIdApiV1MonitorsIdGet(params: GetMonitorByIdApiV1MonitorsIdGet$Params, context?: HttpContext): Observable<Monitor> {
    return this.getMonitorByIdApiV1MonitorsIdGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<Monitor>): Monitor => r.body)
    );
  }

  /** Path part for operation `updateMonitorApiV1MonitorsIdPut()` */
  static readonly UpdateMonitorApiV1MonitorsIdPutPath = '/api/v1/monitors/{id}';

  /**
   * Update Monitor.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateMonitorApiV1MonitorsIdPut()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateMonitorApiV1MonitorsIdPut$Response(params: UpdateMonitorApiV1MonitorsIdPut$Params, context?: HttpContext): Observable<StrictHttpResponse<Monitor>> {
    return updateMonitorApiV1MonitorsIdPut(this.http, this.rootUrl, params, context);
  }

  /**
   * Update Monitor.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateMonitorApiV1MonitorsIdPut$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateMonitorApiV1MonitorsIdPut(params: UpdateMonitorApiV1MonitorsIdPut$Params, context?: HttpContext): Observable<Monitor> {
    return this.updateMonitorApiV1MonitorsIdPut$Response(params, context).pipe(
      map((r: StrictHttpResponse<Monitor>): Monitor => r.body)
    );
  }

  /** Path part for operation `deleteMonitorApiV1MonitorsIdDelete()` */
  static readonly DeleteMonitorApiV1MonitorsIdDeletePath = '/api/v1/monitors/{id}';

  /**
   * Delete Monitor.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteMonitorApiV1MonitorsIdDelete()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteMonitorApiV1MonitorsIdDelete$Response(params: DeleteMonitorApiV1MonitorsIdDelete$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
    return deleteMonitorApiV1MonitorsIdDelete(this.http, this.rootUrl, params, context);
  }

  /**
   * Delete Monitor.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteMonitorApiV1MonitorsIdDelete$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteMonitorApiV1MonitorsIdDelete(params: DeleteMonitorApiV1MonitorsIdDelete$Params, context?: HttpContext): Observable<any> {
    return this.deleteMonitorApiV1MonitorsIdDelete$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>): any => r.body)
    );
  }

}
