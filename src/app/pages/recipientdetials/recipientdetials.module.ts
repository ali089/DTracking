import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecipientdetialsPageRoutingModule } from './recipientdetials-routing.module';

import { RecipientdetialsPage } from './recipientdetials.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecipientdetialsPageRoutingModule
  ],
  declarations: [RecipientdetialsPage]
})
export class RecipientdetialsPageModule {}
