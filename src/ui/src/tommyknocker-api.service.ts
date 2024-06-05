import { Injectable } from '@angular/core';
import { Knocker, Runner } from './interfaces';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';



export interface ICrudApiService<T> {
  getItems(): Observable<T[]>;
  getItem(id: string): Observable<T>;
  createItem(item: T): Observable<T>;
  updateItem(id: string, item: T): Observable<T>;
  deleteItem(id: string): Observable<any>;
}

const api_base = 'http://localhost:4200/api/v1';

@Injectable({
  providedIn: 'root'
})

export class BaseAPIService<T> implements ICrudApiService<T> {

  constructor(private http: HttpClient) {}

  api_path = ""

  getItems(): Observable<T[]> {
    return this.http.get<T[]>(`${api_base}/${this.api_path}`);
  }

  getItem(id: string): Observable<T> {
    return this.http.get<T>(`${api_base}/${this.api_path}/${id}`);
  }

  createItem(knocker: T): Observable<T> {
    return this.http.post<T>(`${api_base}/${this.api_path}`, knocker);
  }

  updateItem(id: string, knocker: T): Observable<T> {
    return this.http.put<T>(`${api_base}/${this.api_path}/${id}`, knocker);
  }

  deleteItem(id: string): Observable<any> {
    return this.http.delete(`${api_base}/${this.api_path}/${id}`);
  }
}

@Injectable({
  providedIn: 'root'
})
export class KnockerAPIService<Knocker> extends BaseAPIService<Knocker> {
  override api_path = '/knockers';
}

@Injectable({
  providedIn: 'root'
})
export class RunnerAPIService<Runner> extends BaseAPIService<Runner> {
  override api_path = '/runners';
}

@Injectable({
  providedIn: 'root'
})
export class MonitorAPIService<Monitor> extends BaseAPIService<Monitor> {
  override api_path = '/monitors';
}

@Injectable({
  providedIn: 'root'
})
export class ResponseAPIService<Response> extends BaseAPIService<Response> {
  override api_path = '/responses';
}

