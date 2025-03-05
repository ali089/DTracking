import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NeworganizationusersmodalPageRoutingModule } from './neworganizationusersmodal-routing.module';

import { NeworganizationusersmodalPage } from './neworganizationusersmodal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NeworganizationusersmodalPageRoutingModule
  ],
  declarations: [NeworganizationusersmodalPage]
})
export class NeworganizationusersmodalPageModule {}
