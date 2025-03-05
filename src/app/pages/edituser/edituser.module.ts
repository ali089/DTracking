import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EdituserPageRoutingModule } from './edituser-routing.module';

import { EdituserPage } from './edituser.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EdituserPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EdituserPage]
})
export class EdituserPageModule {}
