import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditcorrespondencePageRoutingModule } from './editcorrespondence-routing.module';

import { EditcorrespondencePage } from './editcorrespondence.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditcorrespondencePageRoutingModule
  ],
  declarations: [EditcorrespondencePage]
})
export class EditcorrespondencePageModule {}
