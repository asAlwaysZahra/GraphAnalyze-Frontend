import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './user/components/login/login.component';
import { DashboardComponent } from './user/components/dashboard/dashboard.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, title: 'StarData | Login' },
  {
    path: 'dashboard',
    component: DashboardComponent,
    title: 'StarData | Dashboard',
    children: [
      {
        path: '',
        component: LoginComponent,
        title: 'StarData | Dashboard',
      },
      {
        path: 'add-user',
        component: LoginComponent,
        title: 'StarData | Add User',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
