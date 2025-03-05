import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddorganizationusersPage } from './addorganizationusers.page';

const routes: Routes = [
  {
    path: '',
    component: AddorganizationusersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddorganizationusersPageRoutingModule {}
