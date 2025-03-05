import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageusersPage } from './manageusers.page';

const routes: Routes = [
  {
    path: '',
    component: ManageusersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageusersPageRoutingModule {}
