import { Component } from '@angular/core';
import { LoadingController, NavController, AlertController, ModalController } from '@ionic/angular';
import { NavigationExtras, ActivatedRoute, Router } from '@angular/router';
import { AlartmsgService } from '../providers/alartmsg.service';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { Platform } from '@ionic/angular';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { apiIP, connectionErorr } from '../../main';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
//import { error } from '@angular/compiler/src/util';
import { HandleerrService } from '../providers/handleerr.service';
import { ConnectivityService } from '../providers/connectivity.service';
import { QrcodePage } from '../pages/qrcode/qrcode.page';
import {User} from '../models/User';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  newCorrespondence:any={}

  deliveries:string = "";
  partyUserId: Pick<User, "Id">;
  loggedUser:User = JSON.parse(localStorage.getItem("userDetials")) ;

  dvrBeforeSubmit:any = [];
  deliveriesSorted:any = [];
  user:string = 'document';

  driverList={
    correspondences:[],
    driverName:"",
    positionNumber:"",
    phoneNumber:""
  }

  selectedDeliveries=[];
  sentcorres = [];
  scanSub:any;
  postDateTime: string = new Date().toLocaleString();

  public qrCodeValue:string = null;

  constructor(public route:ActivatedRoute, public alert:AlartmsgService,
    private router:Router, private navCtrl:NavController, private qrScanner: QRScanner,
    public loadingCtr:LoadingController, public connectivity:ConnectivityService,
    public platform:Platform,  public http: HttpClient, public handle:HandleerrService,
    public alertCtr:AlertController, public modalCtrl:ModalController) { 
      // this.ionViewWillEnter();
  }

  ionViewWillEnter(){
    
    // console.log(this.loggedUser[0].Id);
    this.partyUserId = this.loggedUser[0].PartyUserId;
    console.log(this.partyUserId);
    this.getDeliveriesBeforeSend();
    this.platform.backButton.subscribeWithPriority(0,()=>{
      document.getElementsByTagName("body")[0].style.opacity = "1";
      this.scanSub.unsubscribe();
    })

    
  }
  // segmentChanged(ev: any) {
  //   // console.log('Segment changed', ev);
  // }

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      this.ionViewWillEnter();
      event.target.complete();
    }, 2000);
  }


  onchange(i,isChecked:boolean){
    
    console.log(i);
    console.log(isChecked);
    
    if(isChecked == true){
      this.selectedDeliveries.push(i);
    }

    if(isChecked == false){

      this.selectedDeliveries.forEach((element, index) => {
        if(element == i){
          this.selectedDeliveries.splice(index,1);
        }
      });

    }
    console.log(this.selectedDeliveries);
  
  }

  startScanning(){
    // Optionally request the permission early
    
    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          // camera permission was granted
          this.qrScanner.show();
          document.getElementsByTagName("body")[0].style.opacity = "0";

          // start scanning
            this.scanSub = this.qrScanner.scan().subscribe((text: string) => {
            // console.log('Scanned something', text);
            this.deliveries = text ;
            document.getElementsByTagName("body")[0].style.opacity = "1";
            this.qrScanner.hide(); // hide camera preview
            this.scanSub.unsubscribe(); // stop scanning
            // this.alert.showAlert(text);
             
            // this.alert.showAlert(this.deliveries);

            this.addDeliveries(this.deliveries);

          },(err)=>{
            this.alert.showAlert(err);
          });

        } else if (status.denied) {
          // camera permission was permanently denied
          // you must use QRScanner.openSettings() method to guide the user to the settings page
          // then they can grant the permission from there
          this.alert.showAlert("access denied");
        } else {
          // permission was denied, but not permanently. You can ask for permission again at a later time.
        }
      })
      .catch((e: any) => this.alert.showAlert(JSON.stringify(e)));
  }


  async addDeliveries(deliver){
    if(this.connectivity.isOnline()){
      // this.alert.showAlert(this.partyUserId+" "+deliver);
     
      const loader = await this.loadingCtr.create({
        message: "الرجاء الانتظار...",
  
      });
       await loader.present();

      this.http.post(apiIP + '/delivery/' + this.partyUserId ,deliver, this.handle.httpOptions)
        .subscribe((data:any) => {
          // console.log(data);
          loader.dismiss();
          console.log("تمت عملية الإضافة بنجاح");
          this.qrCodeValue = `{${data.data}}`;
          
          this.showAlertCode(this.qrCodeValue);
          
        }, error => {
          // catchError(this.handle.handleError)
          loader.dismiss();
          this.alert.showAlert2("لم تتم عملية حفظ البريد بنجاح الرجاء مراجعة مدير النظام" + " " + error.error);
          if(this.qrCodeValue != null){
            this.showAlertCode(this.qrCodeValue);
          }
          
          console.log(error.error);
          
        });
      }else{
        // loader.dismiss()
        this.alert.showAlert(connectionErorr);
      }
    
 
  }

  async showAlertCode(qrCode) {
    const alert = await this.alertCtr.create({
      header: 'نظام نقل البريد',
      message: "تمت عملية حفظ البريد بنجاح",
      buttons: [{
        text:'تم',
        handler: data => {
          this.showQRCode(qrCode);
        }
      }]
    });
    await alert.present();
    

  }

  async showQRCode(code) {
    const modal = await this.modalCtrl.create({
      component:QrcodePage,
      componentProps:{
        qrcode:code
      },
    });
    await modal.present();
    const data:any = await modal.onWillDismiss();
    if(data.role == "backdrop"){
      console.log(data);
      // this.alert.showAlert("يجب مسح الرمز");
      this.showQRCode(code);
    }else{
      console.log(data);
      window.location.reload();
      //this.alert.showAlert("تمت عملية حفظ البريد بنجاح");
    }




    // const alert = await this.alertCtr.create({
    //   header: 'نظام نقل البريد',
    //   message: `<div class="qrcodeImage">
    //   QR code: <qrcode [qrdata]="'${code}'" [imageSource]="../../assets/images/GSClogo.png" [size]="256" [errorCorrectionLevel]="'M'"></qrcode>
    //  </div>`,
      
    //   buttons: [{
    //     text:'تم',
    //     handler: data => {
    //     }
    //   }]
    // });
    // await alert.present();
    

  }

  async getDeliveriesBeforeSend(){
    if(this.connectivity.isOnline()){
      const loader =await this.loadingCtr.create({
        message: "الرجاء الإنتظار ...",
      });
      await loader.present();
      this.http.get(apiIP + '/DeliveriesBeforeSend/', this.handle.httpOptions)
      .subscribe((data) => {
        loader.dismiss();
        this.dvrBeforeSubmit = data;
        const sortedDvrBeforeSubmit = this.dvrBeforeSubmit.sort((a,b) => {
          return a.CurrentStatus - b.CurrentStatus || new Date(b.CurrentDateTime).getTime() - new Date(a.CurrentDateTime).getTime()
        })
        console.log(sortedDvrBeforeSubmit);
      }),
      catchError(this.handle.handleError);
    }else{
      // loader.dismiss()
      this.alert.showAlert(connectionErorr);
    }
  }

  
  // corresdetailsbeforesend(i){
  //   console.log(i);
  //   let navExtras:NavigationExtras={
  //     queryParams:i
  //   }
  //   this.navCtrl.navigateForward('corresdetailsbeforesend',navExtras);
  // }

  updateDelivery(i){
    // i.driverName = 11206;
    let navExtras:NavigationExtras={
      queryParams:i
    }
    this.navCtrl.navigateForward('editcorrespondence',navExtras);
  }

  async presentAlertConfirm(deliveryId) {
    // console.log(deliveryId);
    
    const alert = await this.alertCtr.create({
      cssClass: 'my-custom-class',
      header: 'تأكيد عملية الحذف',
      message: "يرجى ادخال سبب الحذف",
      inputs: [
        {
          name: 'notes',
          placeholder: 'سبب الحذف'
        },
      ],
      buttons: [
        {
          text: 'إلغاء',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'حذف',
          handler: data => {
            if(data.notes == ""){
              this.failedAlert(deliveryId);
            }else{
              let deletedData:any = {
                id: deliveryId,
                note: data.notes
              }
              console.log(deletedData);
     
              this.deleteDelivery(deletedData);
            }

          }
        }
      ]
    });

    await alert.present();
  }

  async failedAlert(id) {
    let alert = await this.alertCtr.create({
    header: 'سبب الحذف',
    message:'يرجى إدخال سبب الحذف',
    buttons: [{
    text: 'إرسال',
      handler: () => {
        this.presentAlertConfirm(id);
      }
    }]
    
    });
    (await alert).present();
  }


  async deleteDelivery(deliveryDeletedData){
    // console.log(notes);
    
    if(this.connectivity.isOnline()){
      const loader = await this.loadingCtr.create({
        message: "الرجاء الانتظار...",
  
      });
       await loader.present();
      // console.log(deliveryId);
      this.http.put(apiIP + '/deleteDelivery/' + this.partyUserId, deliveryDeletedData, this.handle.httpOptions)
      .subscribe((data) => {
        // window.location.reload();
        loader.dismiss();
        this.alert.showAlert("تم حذف البريد بنجاح");
      }, error => {
        loader.dismiss();
          this.alert.showAlert("لم تتم عملية حذف البريد بنجاح الرجاء مراجعة مدير النظام");
          console.log(error.error);
      })
    } else{
      this.alert.showAlert(connectionErorr);
    }
  }

  sendtoDriver(){
    let deliveryStatusObj = {
      DeliveryId:0,
      statusTypeId:0,
      DateTime: new Date(),
      Notes:""
    };
    
    let deliveryStatusArr = [];

    if(this.selectedDeliveries.length == 0){
      // console.log("الرجاء اختر ");
      this.alert.showAlert("الرجاء قم بالإختيار");
      
    }else{
      console.log(this.selectedDeliveries);
      
      this.selectedDeliveries.forEach(element => {
        deliveryStatusObj.DeliveryId = element.Id;
        deliveryStatusObj.statusTypeId = 4001;
        deliveryStatusObj.DateTime = new Date();
        deliveryStatusObj.Notes = "قيد التوصيل";

        deliveryStatusArr.push(deliveryStatusObj);
        
      });

      console.log(deliveryStatusArr);
      
    }
  }

  
}
