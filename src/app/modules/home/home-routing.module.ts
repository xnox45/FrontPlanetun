import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeListComponent } from './components/home-list/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
