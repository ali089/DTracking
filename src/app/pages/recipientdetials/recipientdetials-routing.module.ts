import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipientdetialsPage } from './recipientdetials.page';

const routes: Routes = [
  {
    path: '',
    component: RecipientdetialsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipientdetialsPageRoutingModule {}
