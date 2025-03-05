import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { NeworganizationusersmodalPage } from '../neworganizationusersmodal/neworganizationusersmodal.page';

@Component({
  selector: 'app-addorganizationusers',
  templateUrl: './addorganizationusers.page.html',
  styleUrls: ['./addorganizationusers.page.scss'],
})
export class AddorganizationusersPage implements OnInit {

  data:any = {};
  organizationusersArray=[];
  constructor(public route:ActivatedRoute, public modalCtrl:ModalController,
    private navCtrl:NavController) {
    this.route.queryParams.subscribe(params =>{
      this.data = params;
      // console.log(params)
      // console.log(this.data)
    })
   }

   ngOnInit() {
  }
   async showNewOrganizationUserModal(){
    const modal = await this.modalCtrl.create({
      component: NeworganizationusersmodalPage,
    });
    await modal.present();
    const userdata = await modal.onWillDismiss();
    if(userdata.role == "backdrop"){
      // console.log(userdata);
    }else{
      this.organizationusersArray.push(userdata);
      this.data.data.users = this.organizationusersArray;
    }
    
  }

  addOrganizationUser(){
    let navExtras:NavigationExtras = {
      queryParams:this.data
    }
    this.navCtrl.navigateForward('manageorganizations',navExtras)
  }

}
