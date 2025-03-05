import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditcorrespondencePage } from './editcorrespondence.page';

const routes: Routes = [
  {
    path: '',
    component: EditcorrespondencePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditcorrespondencePageRoutingModule {}
