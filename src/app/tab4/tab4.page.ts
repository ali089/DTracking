import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { User } from '../models/User';
import { ConnectivityService } from '../providers/connectivity.service';
import { HandleerrService } from '../providers/handleerr.service';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { apiIP, connectionErorr } from '../../main';
import { catchError } from 'rxjs/operators';
import { AlartmsgService } from '../providers/alartmsg.service';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  userDetails = JSON.parse(localStorage.getItem('userDetials')) as User;
  tokenDetails = localStorage.getItem('token');
  user = "";
  driverName = this.userDetails[0].FullName;
  
  driverId = null;

  readyToGoDateObj ={
    PartyUserId:null,
    DriverId:""
  } 
  
  readyToGoButton:boolean = true;
  enableButtons:boolean = false;

  date = new Date().toLocaleDateString()
  readyToGoDate = new Date().toLocaleString();

  deliveryByDriver:any = [];
  selectedDeliveryByDriver:any = [];

  constructor(public handle:HandleerrService,public http: HttpClient,
    public connectivity:ConnectivityService,public alertCtr:AlertController,
    public alert:AlartmsgService, public loadingCtr:LoadingController,
    private navCtrl:NavController) { }

    ionViewWillEnter(){
      this.user = "";
      console.log(this.userDetails);
      this.user = this.userDetails[0].UserType;
      console.log(this.user);
      
      this.driverId = this.userDetails[0].PartyUserId;
  
      this.getDeliveriesByDriver(this.driverId);

      this.selectedDeliveryByDriver = [];
  
    }

  ngOnInit() {
  }


  onChange(i, isClecked:boolean){
    // let data = JSON.stringify(i);
    console.log(i);
    
    if(isClecked){
      // this.selectedDeliveries.id = i.Id;
      // this.selectedDeliveries.corrNum = i.CorrespondenceNumber;
      // this.selectedDeliveries.date = i.AssignDateTime;
      // console.log(this.selectedDeliveries);
      
      this.selectedDeliveryByDriver.push(i);
      // console.log(this.selectedDeliveryByDriver);

    }else {
      let index = this.selectedDeliveryByDriver.indexOf(i);
      this.selectedDeliveryByDriver.splice(index,1);
    }

    console.log(this.selectedDeliveryByDriver);
    // console.log(e.value);
    
    
  }


  getDeliveriesByDriver(Id){
    if(this.connectivity.isOnline()){
    // this.readyToGoButton = false;
    this.http.get(apiIP + '/deliveryByDriver/'+ Id)
    .subscribe((data) => {
      // this.alart.showAlert(data);
      this.deliveryByDriver = data;
      this.deliveryByDriver.forEach(delivery => {
        if(delivery.CurrentStatusId == 2804){
          this.readyToGoButton = true;
          this.enableButtons = true;
          delivery.isClecked = false;
        }else{
          this.readyToGoButton = false;
          this.enableButtons = false;
        }
      });

      console.log(this.deliveryByDriver);
    }),
    catchError(this.handle.handleError);
  }else{
    // loader.dismiss()
    this.alert.showAlert(connectionErorr);
  }
  }

  readyToGo(){
    if(this.connectivity.isOnline()){
    // this.readyToGoDateObj.PartyUserId = this.partyUserId;

    console.log(this.readyToGoDateObj);
    this.readyToGoButton = true;
    this.http.put(apiIP + '/addreadyToGoDate/'+ this.driverId , this.handle.httpOptions)
    .subscribe((data) => {
      // this.alart.showAlert(data);
      console.log(data);
      this.alert.showAlert("الرسائل جاهزة للتوصيل");
      // window.location.reload();
    }),
    catchError(this.handle.handleError);
  }else{
    // loader.dismiss()
    this.alert.showAlert(connectionErorr);
  }
  }


  goToRecipientDetails(i){
      
    let navExtras:NavigationExtras={
      queryParams:i
    }
    this.navCtrl.navigateForward('recipientdetials',navExtras);
  }

  goToRecipientDetails1(){
    let navExtras:NavigationExtras={
      queryParams:this.selectedDeliveryByDriver
    }
    this.navCtrl.navigateForward('recipientdetialsonetomany',navExtras);
  }

    async returnBack(Id) {

  const prompt = await this.alertCtr.create({
    header: 'تأكيد عملية الإرجاع',
    message: "يرجى إدخال سبب إرجاع البريد",
    inputs: [
      {
        name: 'notes',
        placeholder: 'سبب الإرجاع'
      },
    ],
    buttons: [
      {
        text: 'إلغاء',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'إرسال',
        handler: data => {
          if(data.notes == ""){
            this.failedAlert(Id);
          }else{
          //  alert(JSON.stringify(data));
          let returnedData:any = {
            id: Id,
            note: data.notes
          }
          this.returnDeliveryByDriver(returnedData);
          }

        }
      }
    ]
  });
  await prompt.present();
}

async failedAlert(id) {
  let alert = await this.alertCtr.create({
  header: 'سبب الإرجاع',
  message:'يرجى إدخال سبب الإرجاع',
  buttons: [{
  text: 'إرسال',
    handler: () => {
      this.returnBack(id);
    }
  }]
  
  });
  (await alert).present();
}

async returnDeliveryByDriver(returnData){

  // console.log(notes);

  if(this.connectivity.isOnline()){
 const loader =await this.loadingCtr.create({
    message: "الرجاء الإنتظار ...",
  });
  await loader.present();
  this.http.put(apiIP + '/returnBack/' + this.driverId, returnData, this.handle.httpOptions)
  .subscribe((data) => {
    loader.dismiss();
    console.log(data);
    this.alert.showAlert("تم إرجاع البريد بنجاح");
    // window.location.reload();
  })
     }else{
      // loader.dismiss()
      this.alert.showAlert(connectionErorr);
    }
}
}
