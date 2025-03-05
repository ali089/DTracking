import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CorrespondencedetailsPage } from './correspondencedetails.page';

const routes: Routes = [
  {
    path: '',
    component: CorrespondencedetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CorrespondencedetailsPageRoutingModule {}
