import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'any'
})
export class AlartmsgService {

  constructor(private alertctr: AlertController) { }

  async showAlert(msg) {
    const alert = await this.alertctr.create({
      header: 'نظام نقل البريد',
      message: msg,
      buttons: [{
        text:'تم',
        handler: data => {
          window.location.reload();
        }
      }]
    });
    await alert.present();
    

  }


  async showAlert2(msg) {
    const alert = await this.alertctr.create({
      header: 'نظام نقل البريد',
      message: msg,
      buttons: [{
        text:'تم',
        handler: data => {
        }
      }]
    });
    await alert.present();
    

  }
}
