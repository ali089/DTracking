import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewusermodalPage } from './newusermodal.page';

const routes: Routes = [
  {
    path: '',
    component: NewusermodalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewusermodalPageRoutingModule {}
