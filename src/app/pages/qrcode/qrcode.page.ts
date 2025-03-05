import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.page.html',
  styleUrls: ['./qrcode.page.scss'],
})
export class QrcodePage implements OnInit {

  @Input() public qrcode;
  qrCodeValue:string = null;

  constructor(public modalCtrl:ModalController) { }

  ngOnInit() {
    console.log(`${this.qrcode}`);
    this.qrCodeValue = this.qrcode;
    
  }

  closeModal(){
    this.modalCtrl.dismiss(null, 'cancel');
  }

}
