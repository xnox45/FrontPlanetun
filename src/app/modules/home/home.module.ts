import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';

import { SharedModule } from 'src/app/shared/shared.module';

import { HomeListComponent } from './components/home-list/home.component';

@NgModule({
  declarations: [
    HomeListComponent,
  ],
  
  imports: [CommonModule, HomeRoutingModule, SharedModule],
})
export class HomeModule {}
