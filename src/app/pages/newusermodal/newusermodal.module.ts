import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewusermodalPageRoutingModule } from './newusermodal-routing.module';

import { NewusermodalPage } from './newusermodal.page';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewusermodalPageRoutingModule,
    IonicSelectableModule,
    ReactiveFormsModule

  ],
  declarations: [NewusermodalPage]
})
export class NewusermodalPageModule {}
