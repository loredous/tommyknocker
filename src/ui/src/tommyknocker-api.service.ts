import { Injectable } from '@angular/core';
import { Knocker, Runner, TestStatus } from './interfaces';
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

  constructor(protected http: HttpClient) {}

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
@Injectable({
  providedIn: 'root'
})
export class KnockAPIService<Knock> extends BaseAPIService<Knock> {
  override api_path = '/knocks';
}
@Injectable({
  providedIn: 'root'
})
export class ResultAPIService<Result> extends BaseAPIService<Result> {
  override api_path = '/results';
}
@Injectable({
  providedIn: 'root'
})
export class TestConfigurationAPIService<TestConfiguration> extends BaseAPIService<TestConfiguration> {
  override api_path = '/test-configurations';
}
@Injectable({
  providedIn: 'root'
})
export class TestSuiteAPIService<TestSuite> extends BaseAPIService<TestSuite> {
  override api_path = '/test-suites';
}
@Injectable({
  providedIn: 'root'
})
export class TestComponentStatusAPIService<TestComponentStatus> extends BaseAPIService<TestComponentStatus> {
  override api_path = '/test-component-statuses';

  getTestComponentStatusByTest(test_id: string): Observable<TestComponentStatus[]> {
    return this.http.get<TestComponentStatus[]>(`${api_base}/${this.api_path}/by_test/${test_id}`);
  }
}
@Injectable({
  providedIn: 'root'
})
export class TestAPIService<Test> extends BaseAPIService<Test> {
  override api_path = '/tests';

  getTestsByStatus(status: TestStatus): Observable<Test[]> {
    return this.http.get<Test[]>(`${api_base}/${this.api_path}/by_status/${status}`);
  }

  getRunningTests(): Observable<Test[]> {
    return this.http.get<Test[]>(`${api_base}/${this.api_path}/running/`);
  }

  getCompletedTests(): Observable<Test[]> {
    return this.http.get<Test[]>(`${api_base}/${this.api_path}/complete/`);
  }
}
