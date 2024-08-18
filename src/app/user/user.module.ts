import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatRippleModule } from '@angular/material/core';
import { AppRoutingModule } from '../app-routing.module';
import { MainPageComponent } from './components/dashboard/main-page/main-page.component';
import { SharedModule } from '../shared/shared.module';
import { AddUserComponent } from './components/dashboard/add-user/add-user.component';
import { MatRadioModule } from '@angular/material/radio';
import { ManageAccountComponent } from './components/dashboard/manage-account/manage-account.component';
import { ManageUsersComponent } from './components/dashboard/manage-users/manage-users.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [
    LoginComponent,
    DashboardComponent,
    MainPageComponent,
    AddUserComponent,
    ManageAccountComponent,
    ManageUsersComponent,
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    FormsModule,
    MatSidenavModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatListModule,
    MatRippleModule,
    AppRoutingModule,
    SharedModule,
    MatRadioModule,
    MatTableModule,
    MatPaginatorModule,
  ],
})
export class UserModule {}
