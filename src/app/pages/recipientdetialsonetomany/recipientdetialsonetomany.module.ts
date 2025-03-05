import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecipientdetialsonetomanyPageRoutingModule } from './recipientdetialsonetomany-routing.module';

import { RecipientdetialsonetomanyPage } from './recipientdetialsonetomany.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecipientdetialsonetomanyPageRoutingModule
  ],
  declarations: [RecipientdetialsonetomanyPage]
})
export class RecipientdetialsonetomanyPageModule {}
