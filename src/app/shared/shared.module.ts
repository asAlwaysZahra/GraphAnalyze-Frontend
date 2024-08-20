import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './components/card/card.component';
import { DashboardHeaderComponent } from './components/dashboard-header/dashboard-header.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [CardComponent, DashboardHeaderComponent],
  imports: [CommonModule, MatIconModule],
  exports: [CardComponent, DashboardHeaderComponent],
})
export class SharedModule {}
