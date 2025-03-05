import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddorganizationusersPageRoutingModule } from './addorganizationusers-routing.module';

import { AddorganizationusersPage } from './addorganizationusers.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddorganizationusersPageRoutingModule
  ],
  declarations: [AddorganizationusersPage]
})
export class AddorganizationusersPageModule {}
