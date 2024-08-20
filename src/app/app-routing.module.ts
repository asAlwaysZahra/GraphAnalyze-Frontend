import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './user/components/login/login.component';
import { DashboardComponent } from './user/components/dashboard/dashboard.component';
import { MainPageComponent } from './user/components/dashboard/main-page/main-page.component';
import { ManageAccountComponent } from './user/components/dashboard/manage-account/manage-account.component';
import { DashboardGuard } from './user/guards/auth/dashboard.guard';
import { DataAnalysisComponent } from './graph/data-analysis/data-analysis.component';
import { ManageUsersComponent } from './user/components/dashboard/manage-users/manage-users.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    title: 'StarData | Login',
    canActivate: [DashboardGuard],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    title: 'StarData | Dashboard',
    canActivate: [DashboardGuard],
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
    ],
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
