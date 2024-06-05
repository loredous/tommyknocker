import { Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ManagementComponent } from '../management/management.component';

export const routes: Routes = [
    { path: 'dashboard', component: DashboardComponent},
    { path: 'manage/:type', component: ManagementComponent},
];
