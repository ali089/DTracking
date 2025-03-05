import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { apiIP, connectionErorr } from '../../../main';
import { HandleerrService } from '../../providers/handleerr.service';
import { catchError } from 'rxjs/operators';
import { AlartmsgService } from '../../providers/alartmsg.service';
import { ConnectivityService } from 'src/app/providers/connectivity.service';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-editcorrespondence',
  templateUrl: './editcorrespondence.page.html',
  styleUrls: ['./editcorrespondence.page.scss'],
})
export class EditcorrespondencePage implements OnInit {

  public receivedData:any = {};

  public userData:any = {};
  // userId: Pick<User, "PartyUserId">;
  // userId: Pick<User, "PartyUserId">;

  partyUserId: Pick<User, "Id">;
  loggedUser:User = JSON.parse(localStorage.getItem("userDetials")) ;

  private updatedData={
    CorrespondenceNumber:"",
    DeliveryInfoId:"",
    Id:"",
    OfficeSite:"",
    OutboundSender:"",
    PriorityLevel:"",
    SendTo:"",
    confidLevel:"",
    deliveryMethod:"",
    driverName:"",
    driverNumber:"",
    organizationName:""
    
  }

  drivers:any = [];
  deliveryId:any = ""
  methods:any =[];
  constructor(public route:ActivatedRoute, public http:HttpClient, public handle:HandleerrService,
    public navCtrl:NavController, public router:Router, public alert:AlartmsgService,
    public connectivity:ConnectivityService, public loadingCtr:LoadingController) { 
      // this.ionViewWillEnter();
      
  }

  ngOnInit() {
 
  }

  ionViewWillEnter(){
    // console.log(this.userId);
    this.partyUserId = this.loggedUser[0].PartyUserId;
    console.log(this.partyUserId);
    if(this.connectivity.isOnline()){
     // console.log(datauser);
      // console.log(this.userId);
      // const loader = await this.loadingCtr.create({
      //   message: "الرجاء الانتظار...",
  
      // });
      //  await loader.present();
    this.route.queryParams.subscribe(params =>{
      this.receivedData = params;
      //loader.dismiss();
      console.log(this.receivedData);
      //  this.deliveryId = this.data.Id
      this.getDeliveryById(this.receivedData.Id);
      
    });
    this.getTransportUsers();
    // this.getDeliveryMethods();
    }else{
      // loader.dismiss()
      this.alert.showAlert(connectionErorr);
    }
  }

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      this.ionViewWillEnter();
      event.target.complete();
    }, 2000);
  }


  async getDeliveryById(deliveryId){
    if(this.connectivity.isOnline()){
      const loader = await this.loadingCtr.create({
        message: "الرجاء الانتظار...",
  
      });
       await loader.present();
    this.http.get(apiIP + '/deliveryId/' + deliveryId)
    .subscribe((data) => {
      this.userData =data[0];
      loader.dismiss();
      console.log(this.userData);
    }),
    catchError(this.handle.handleError);
  }else{
    // loader.dismiss()
    this.alert.showAlert(connectionErorr);
  }
  }

  getTransportUsers(){
    if(this.connectivity.isOnline()){
      // let Id = 3105
      let PartyId = 3105
      this.http.get(apiIP + '/usersByPartyId/' + PartyId)
      .subscribe((data) => {
        // console.log(data);
        this.drivers =data;
        console.log(this.drivers);
        
    
      }),
      catchError(this.handle.handleError);  
  }else{
    // loader.dismiss()
    this.alert.showAlert(connectionErorr);
  }
  }

  getDeliveryMethods(){
    if(this.connectivity.isOnline()){
      let CategoryId = 100;
      this.http.get(apiIP + '/methods/' + CategoryId)
      .subscribe((data) =>{
        this.methods = data;
        console.log(this.methods);
        
      }),
      catchError(this.handle.handleError);
    }else{
      // loader.dismiss()
      this.alert.showAlert(connectionErorr);
    }
  }

  changeDriver(e){
    console.log(e.detail.value);
    this.drivers.forEach(driver => {
      if(driver.PartyUserId == e.detail.value){
        this.userData.DriverNumber = "";
        this.userData.DriverNumber = driver.Phone;
      }
    });
    
  }

  changeMethod(e){
    console.log(e.detail.value);
    
  }

  resetText(){
    
  }
//   companyFormSelected(newform) {
//     let selectedForm = this.drivers.find((f)=>{
//       return f.id === newform;
//     });
//     // this.userData.DriverId = selectedForm;
//     console.log(selectedForm);
     
// }

//   compareWith(a: any, b: any) {
//     return a.id === b.id;
//   }


async updateDelivery(datauser){
      if(this.connectivity.isOnline()){
        console.log(datauser);
        // console.log(this.userId);
        const loader = await this.loadingCtr.create({
          message: "الرجاء الانتظار...",
    
        });
         await loader.present();
        this.http.put(apiIP + '/editDelivery/' + this.partyUserId, datauser, this.handle.httpOptions)
        .subscribe((data) => {
          loader.dismiss();
          console.log(data);
          // this.router.navigateByUrl('tabs/tab2',{skipLocationChange: false}).then(() => {
            this.router.navigate(['/tabs/tab2']).then(() => {
              // window.location.reload();
            })
            this.alert.showAlert("تم التعديل البريد بنجاح");
          
        }, error => {
          loader.dismiss();
          this.router.navigate(['/tabs/tab2']).then(() => {
            // window.location.reload();
          })
            this.alert.showAlert2("لم تتم عملية تعديل البريد الرجاء مراجعة مدير النظام");
            console.log(error.message);
        });
      }else{
        // loader.dismiss()
        this.alert.showAlert(connectionErorr);
      }
  
}
}
