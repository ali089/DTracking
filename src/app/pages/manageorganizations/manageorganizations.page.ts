import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { NeworganizationmodalPage } from '../neworganizationmodal/neworganizationmodal.page';
import { NavigationExtras, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-manageorganizations',
  templateUrl: './manageorganizations.page.html',
  styleUrls: ['./manageorganizations.page.scss'],
})
export class ManageorganizationsPage implements OnInit {

  organizationsArray=[];
  newOrganization = {
    
  }
  organizationUsers: any= [];
  constructor(public modalCtrl:ModalController, private navCtrl:NavController,
    private route:ActivatedRoute) { 
      // this.route.queryParams.subscribe(params =>{
      //   this.newOrganization = params;
      //   // this.newOrganization.users = this.organizationUsers;
      //   console.log(this.newOrganization);
      //   console.log(this.organizationsArray);
      // })
  }

  ngOnInit() {
  }

  async showNewOrganizationModal(){
    const modal = await this.modalCtrl.create({
      component: NeworganizationmodalPage,
    });
    await modal.present();
    const data = await modal.onWillDismiss();
   
    if(data.role == "backdrop"){
      console.log(data);
    }else{
      this.organizationsArray.push(data);
      console.log(this.organizationsArray);
    }
    

  }

  addOrganizationUsers(item){
    let navExtras:NavigationExtras = {
      queryParams:item
    }
    this.navCtrl.navigateForward('addorganizationusers',navExtras);
  }
}
