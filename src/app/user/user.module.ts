import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatIconModule],
  exports: [MatFormFieldModule, MatInputModule, MatIconModule],
})
export class UserModule {}
