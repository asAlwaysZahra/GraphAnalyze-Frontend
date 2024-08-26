import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './user/components/login/login.component';
import { DashboardComponent } from './user/components/dashboard/dashboard.component';
import { MainPageComponent } from './user/components/dashboard/main-page/main-page.component';
import { ManageAccountComponent } from './user/components/dashboard/manage-account/manage-account.component';
import { DataAnalysisComponent } from './graph/components/data-analysis/data-analysis.component';
import { ManageUsersComponent } from './user/components/dashboard/manage-users/manage-users.component';
import { AppComponent } from './app.component';
import { AuthGuard } from './guards/auth/auth.guard';
import { PermissionGuard } from './guards/permissions/permission.guard';
import { AddGraphComponent } from './graph/components/add-graph/add-graph.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    title: 'StarData | Login',
    canActivate: [AuthGuard],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    title: 'StarData | Dashboard',
    canActivate: [AuthGuard],
    canActivateChild: [PermissionGuard],
    children: [
      {
        path: '',
        component: MainPageComponent,
        title: 'StarData | Dashboard',
      },
      {
        path: 'manage-users',
        component: ManageUsersComponent,
        title: 'StarData | Manage Users',
        data: { permission: 'UploadImage' },
      },
      {
        path: 'manage-account',
        component: ManageAccountComponent,
        title: 'StarData | Manage Account',
      },
      {
        path: 'data-analysis',
        component: DataAnalysisComponent,
        title: 'StarData | Data Analysis',
      },
      {
        path: 'add-graph',
        component: AddGraphComponent,
        title: 'StarData | Add Graph',
      },
    ],
  },
  {
    path: '',
    component: AppComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
