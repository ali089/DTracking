import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SendtomodalPage } from './sendtomodal.page';

const routes: Routes = [
  {
    path: '',
    component: SendtomodalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SendtomodalPageRoutingModule {}
