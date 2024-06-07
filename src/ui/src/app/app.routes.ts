import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManagementComponent } from './management/management.component';
import { TestRunsComponent } from './test-runs/test-runs.component';

export const routes: Routes = [
    { path: 'dashboard', component: DashboardComponent},
    { path: 'manage/:type', component: ManagementComponent},
    { path: 'test_runs', component: TestRunsComponent},
];
