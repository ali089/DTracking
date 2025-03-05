import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CorrespondencedetailsPageRoutingModule } from './correspondencedetails-routing.module';

import { CorrespondencedetailsPage } from './correspondencedetails.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CorrespondencedetailsPageRoutingModule
  ],
  declarations: [CorrespondencedetailsPage]
})
export class CorrespondencedetailsPageModule {}
