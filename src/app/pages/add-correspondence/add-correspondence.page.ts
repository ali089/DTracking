import { Component, OnInit } from '@angular/core';
import { NavController,ModalController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
import { SendtomodalPage } from '../sendtomodal/sendtomodal.page';

@Component({
  selector: 'app-add-correspondence',
  templateUrl: './add-correspondence.page.html',
  styleUrls: ['./add-correspondence.page.scss'],
})
export class AddCorrespondencePage implements OnInit {



  newCorrespondence={
    correspondenceNumber:"",
    organizationName:"",
    organizationLocation:"",
    sendTo:"",
    securitylevel:"",
    prioritylevel:"",
    deliveryWay:"",
    driverName:"",
    dateTime:""
  }

  // addOrganization={
  //   sendTo:"",
  //   organizationName:"",
  //   organizationLocation:""
  // }
  
  // sendCopyTo ={
  //   sendTo:"",
  //   organizationName:"",
  //   organizationLocation:""
  // }
sendToArray = [];
postDateTime: string = new Date().toLocaleString();
  constructor(private navCtrl:NavController, public modalCtrl:ModalController) { }

  ngOnInit() {
  }

  addCorrespondence(newCorrespondence){
    newCorrespondence.dateTime = this.postDateTime;
    let navExtras:NavigationExtras = {
      queryParams:newCorrespondence
    }
    this.navCtrl.navigateForward('tabs/tab2',navExtras);
    console.log(newCorrespondence);
  }

  async showSendtoModal(){
    const profileModal =await this.modalCtrl.create({
      component: SendtomodalPage,
      componentProps:{'correspondenceNumber':this.newCorrespondence.correspondenceNumber}
    });
    
    await profileModal.present();

    const data = await profileModal.onWillDismiss();
    if(data.role == "backdrop"){
      console.log(data);
      
    }else{
      this.sendToArray.push(data);
      console.log(this.sendToArray);
    }
    
    // this.newCorrespondence.sendTo = this.sendToArray;
  }
  
  async updateSendTo(){

  }
}


