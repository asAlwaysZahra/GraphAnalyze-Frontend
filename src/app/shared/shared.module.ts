import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './components/card/card.component';
import { DashboardHeaderComponent } from './components/dashboard-header/dashboard-header.component';
import { MatIconModule } from '@angular/material/icon';
import { ThemeService } from './services/theme.service';
import { AppRoutingModule } from '../app-routing.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LoadingService } from './services/loading.service';

@NgModule({
  declarations: [CardComponent, DashboardHeaderComponent],
  imports: [CommonModule, MatIconModule, AppRoutingModule, MatTooltipModule],
  providers: [ThemeService, LoadingService],
  exports: [CardComponent, DashboardHeaderComponent],
})
export class SharedModule {}
