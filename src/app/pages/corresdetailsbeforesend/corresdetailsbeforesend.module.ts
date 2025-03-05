import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CorresdetailsbeforesendPageRoutingModule } from './corresdetailsbeforesend-routing.module';

import { CorresdetailsbeforesendPage } from './corresdetailsbeforesend.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CorresdetailsbeforesendPageRoutingModule
  ],
  declarations: [CorresdetailsbeforesendPage]
})
export class CorresdetailsbeforesendPageModule {}
