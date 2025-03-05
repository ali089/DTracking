import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddCorrespondencePageRoutingModule } from './add-correspondence-routing.module';

import { AddCorrespondencePage } from './add-correspondence.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddCorrespondencePageRoutingModule
  ],
  declarations: [AddCorrespondencePage]
})
export class AddCorrespondencePageModule {}
