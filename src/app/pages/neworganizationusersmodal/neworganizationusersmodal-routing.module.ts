import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NeworganizationusersmodalPage } from './neworganizationusersmodal.page';

const routes: Routes = [
  {
    path: '',
    component: NeworganizationusersmodalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NeworganizationusersmodalPageRoutingModule {}
