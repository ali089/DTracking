import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-neworganizationusersmodal',
  templateUrl: './neworganizationusersmodal.page.html',
  styleUrls: ['./neworganizationusersmodal.page.scss'],
})
export class NeworganizationusersmodalPage  {

  organizationuser={
    name:"",
    position:"",
    notes:""
  }
  constructor(private modalCtrl:ModalController) { }

  dismissModal(){
    this.modalCtrl.dismiss(null, 'cancel');
  }
  
  newOrganization(organizationuser){
    this.modalCtrl.dismiss(organizationuser, 'add new organization user');
  }
  

}
