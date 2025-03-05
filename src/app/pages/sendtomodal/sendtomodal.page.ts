import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-sendtomodal',
  templateUrl: './sendtomodal.page.html',
  styleUrls: ['./sendtomodal.page.scss'],
})
export class SendtomodalPage {

  list:any=[
    {
      organizationName:"وزارة التربية والتعليم",
      organizationLocation:"مرتفعات المطار",
      sendTo:"وزيرة التربية والتعليم"

    },
    {
      organizationName:"وزارة الصحة",
      organizationLocation:"العذيبة",
      sendTo:"وكيل وزارة الصحة"

    },
    {
      organizationName:"وزارة التربية والتعليم",
      organizationLocation:"روي",
      sendTo:"وكيل التربية والتعليم"

    },
    {
      organizationName:"وزارة الصحة",
      organizationLocation:"الخوير",
      sendTo:"وزير الصحة"

    }
  ]

  addOrganization={
    sendTo:"",
    organizationName:"",
    organizationLocation:"",
    correspondenceType:""
  }

  @Input() correspondenceNumber: number;
  // @Input() organizationName: string;
  // @Input() organizationLocation:string;
  constructor(private modalCtrl:ModalController) { }

  
  dismissModal(){
    this.modalCtrl.dismiss(null, 'cancel');
  }
  addsendto(addOrganization){
    this.modalCtrl.dismiss(addOrganization, 'addOrg');
    // console.log(addOrganization);
  }
}
