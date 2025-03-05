import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NeworganizationmodalPage } from './neworganizationmodal.page';

const routes: Routes = [
  {
    path: '',
    component: NeworganizationmodalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NeworganizationmodalPageRoutingModule {}
