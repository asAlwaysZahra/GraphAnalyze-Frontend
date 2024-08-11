import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { TesttComponent } from './components/testt/testt.component';

@NgModule({
  declarations: [TesttComponent],
  imports: [CommonModule],
  providers: [provideHttpClient()],
  exports: [TesttComponent],
})
export class UserModule {}
