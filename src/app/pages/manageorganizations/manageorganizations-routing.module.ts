import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageorganizationsPage } from './manageorganizations.page';

const routes: Routes = [
  {
    path: '',
    component: ManageorganizationsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageorganizationsPageRoutingModule {}
