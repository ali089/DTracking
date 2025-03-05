import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CorresdetailsbeforesendPage } from './corresdetailsbeforesend.page';

const routes: Routes = [
  {
    path: '',
    component: CorresdetailsbeforesendPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CorresdetailsbeforesendPageRoutingModule {}
