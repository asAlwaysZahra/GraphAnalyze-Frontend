import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './user/components/login/login.component';
import { DashboardMainComponent } from './user/components/dashboard-main/dashboard-main.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, title: 'StarData | Login' },
  {
    path: 'dashboard',
    component: DashboardMainComponent,
    title: 'StarData | Dashboard',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
