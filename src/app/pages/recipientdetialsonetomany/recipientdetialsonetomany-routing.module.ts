import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipientdetialsonetomanyPage } from './recipientdetialsonetomany.page';

const routes: Routes = [
  {
    path: '',
    component: RecipientdetialsonetomanyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipientdetialsonetomanyPageRoutingModule {}
