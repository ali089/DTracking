import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NeworganizationmodalPageRoutingModule } from './neworganizationmodal-routing.module';

import { NeworganizationmodalPage } from './neworganizationmodal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NeworganizationmodalPageRoutingModule
  ],
  declarations: [NeworganizationmodalPage]
})
export class NeworganizationmodalPageModule {}
