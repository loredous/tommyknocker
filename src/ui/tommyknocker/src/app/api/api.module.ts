/* tslint:disable */
/* eslint-disable */
import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration, ApiConfigurationParams } from './api-configuration';

import { KnockersService } from './services/knockers.service';
import { KnocksService } from './services/knocks.service';
import { RunnersService } from './services/runners.service';
import { ResultsService } from './services/results.service';
import { MonitorsService } from './services/monitors.service';
import { ResponsesService } from './services/responses.service';
import { ResponseExpectationsService } from './services/response-expectations.service';
import { TestConfigurationsService } from './services/test-configurations.service';
import { TestComponentStatusesService } from './services/test-component-statuses.service';
import { TestsService } from './services/tests.service';
import { TestSuitesService } from './services/test-suites.service';

/**
 * Module that provides all services and configuration.
 */
@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    KnockersService,
    KnocksService,
    RunnersService,
    ResultsService,
    MonitorsService,
    ResponsesService,
    ResponseExpectationsService,
    TestConfigurationsService,
    TestComponentStatusesService,
    TestsService,
    TestSuitesService,
    ApiConfiguration
  ],
})
export class ApiModule {
  static forRoot(params: ApiConfigurationParams): ModuleWithProviders<ApiModule> {
    return {
      ngModule: ApiModule,
      providers: [
        {
          provide: ApiConfiguration,
          useValue: params
        }
      ]
    }
  }

  constructor( 
    @Optional() @SkipSelf() parentModule: ApiModule,
    @Optional() http: HttpClient
  ) {
    if (parentModule) {
      throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
    }
    if (!http) {
      throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
      'See also https://github.com/angular/angular/issues/20575');
    }
  }
}
