import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddCorrespondencePage } from './add-correspondence.page';

const routes: Routes = [
  {
    path: '',
    component: AddCorrespondencePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddCorrespondencePageRoutingModule {}
