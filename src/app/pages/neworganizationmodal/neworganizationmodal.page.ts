import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-neworganizationmodal',
  templateUrl: './neworganizationmodal.page.html',
  styleUrls: ['./neworganizationmodal.page.scss'],
})
export class NeworganizationmodalPage  {

  organization = {
    name:"",
    location:"",
    phone:"",
    email:"",
    users:[]

  }
  constructor(private modalCtrl:ModalController) { }

  dismissModal(){
    this.modalCtrl.dismiss(null, 'cancel');
  }

  newOrganization(organization){
    this.modalCtrl.dismiss(organization, 'add new organization');
  }

}
