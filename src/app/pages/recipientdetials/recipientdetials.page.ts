import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import SignaturePad from 'signature_pad';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { AlartmsgService } from '../../providers/alartmsg.service';
import { HttpClient } from '@angular/common/http';
import { apiIP, connectionErorr } from '../../../main';
import { HandleerrService } from '../../providers/handleerr.service';
import { catchError } from 'rxjs/operators';
import { ConnectivityService } from 'src/app/providers/connectivity.service';
import { AlertController } from '@ionic/angular';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-recipientdetials',
  templateUrl: './recipientdetials.page.html',
  styleUrls: ['./recipientdetials.page.scss'],
})
export class RecipientdetialsPage implements OnInit, AfterViewInit {
  @ViewChild('canvas', { static: true }) signaturePadElement;
  // private signaturePadOptions: Object = { // passed through to szimek/signature_pad constructor
  //   'minWidth': 5,
  //   'canvasWidth': 500,
  //   'canvasHeight': 300
  // };
  signaturePad: any;
  canvasWidth: number;
  canvasHeight: number;

  deliveryData:any = {
    CorrespondenceNumber:"",
    organizationName:"",
    SendTo:"",
    
  } ;

  ReceipientData = {
    Ids:[],
    DeliveryInfoIds:[],
    ReceipientName:"",
    ReceipientId:"",
    ReceipientSignature:null,
    DeliveryCoordinates:"",
    deliveryDateTime:null,
    DriverId:null,
    OfficeSite:""
  }
  // partyUserId: Pick<User, "Id">;
  loggedUser:User = JSON.parse(localStorage.getItem("userDetials")) ;
  latitude: any = 0; //latitude
  longitude: any = 0; //longitude
  address: string;

  deliveryDateTime = new Date().toLocaleString();

  constructor(public route:ActivatedRoute, private base64ToGallery: Base64ToGallery,
    private androidPermissions: AndroidPermissions, private elementRef: ElementRef,
    private geolocation: Geolocation, private nativeGeocoder: NativeGeocoder,
    public alert:AlartmsgService, public http:HttpClient,
    public handle:HandleerrService, public router:Router,
    public connectivity:ConnectivityService, public alertCtr:AlertController) {

      this.route.queryParams.subscribe(params=>{
        this.deliveryData = params;
        console.log(this.deliveryData);
        
      })

   }

   ngOnInit(): void {
    this.init();
  }

  options = {
    timeout: 10000, 
    enableHighAccuracy: true, 
    maximumAge: 3600
  };

  // use geolocation to get user's device coordinates
  getCurrentCoordinates(id, ReceipientData) {
    if(this.connectivity.isOnline()){
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      
      // this.getAddress(this.latitude,this.longitude);
      // this.data.Latitude = this.latitude;
      // console.log(this.ReceipientData.Latitude);
      this.updateDelivery(id, ReceipientData)
      // this.data.Longitude = this.longitude;
     }).catch((error) => {
       console.log('Error getting location', error);
     });
    }else{
      // loader.dismiss()
      this.alert.showAlert(connectionErorr);
    }
  }

    // geocoder options
    nativeGeocoderOptions: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };

    // get address using coordinates
    getAddress(lat,long){
      this.nativeGeocoder.reverseGeocode(lat, long, this.nativeGeocoderOptions)
      .then((res: NativeGeocoderResult[]) => {
        this.address = this.pretifyAddress(res[0]);
      })
      .catch((error: any) => {
        alert('Error getting location'+ JSON.stringify(error));
      });
    }
    
    // address
    pretifyAddress(address){
      let obj = [];
      let data = "";
      for (let key in address) {
        obj.push(address[key]);
      }
      obj.reverse();
      for (let val in obj) {
        if(obj[val].length)
        data += obj[val]+', ';
      }
      return address.slice(0, -2);
    }


  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.init();
  }

  // canvasResize() {
  //   let canvas = document.querySelector('canvas');
  //   this.signaturePad.set('minWidth', 1);
  //   this.signaturePad.set('canvasWidth', canvas.offsetWidth);
  //   this.signaturePad.set('canvasHeight', canvas.offsetHeight);
  // }

  init() {
    const canvas: any = this.elementRef.nativeElement.querySelector('canvas');
    console.log(window.innerWidth);
    console.log(window.innerHeight );
    console.log(canvas.width );
    console.log(canvas.height );
    
    // canvas.width = window.innerWidth - canvas.width ;
    // canvas.height = window.innerHeight - canvas.height;
    if (window.innerWidth > window.innerHeight){
        canvas.width = 1100 ;
        canvas.height = 480;
    }else{
      canvas.width = 680 ;
      canvas.height = 300;
    }
    if (this.signaturePad) {
      this.signaturePad.clear(); // Clear the pad on init
    }
  }
  public ngAfterViewInit(): void {
  this.signaturePad = new SignaturePad(this.signaturePadElement.nativeElement);
  this.signaturePad.clear();
  this.signaturePad.penColor = 'rgb(56,128,255)';
}

save(): void {
  const img = this.signaturePad.toDataURL();
  console.log(img);
  
  this.ReceipientData.ReceipientSignature = img;
  console.log(this.ReceipientData.ReceipientSignature);
  this.alert.showAlert2("تم حفظ التوقيع بنجاح");
  
  // this.base64ToGallery.base64ToGallery(img).then(
  //   res => console.log('Saved image to gallery ', res),
  //   err => console.log('Error saving image to gallery ', err)
  // );
}

// async failedAlert(msg) {
//   let alert = await this.alertCtr.create({
//   header: 'نظام نقل البريد',
//   message:msg,
//   buttons: [{
//   text: 'إغلاق',
//     handler: () => {
//       // this.presentAlertConfirm(id);
//     }
//   }]
  
//   });
//   (await alert).present();
// }

isCanvasBlank(): boolean {
  if (this.signaturePad) {
    return this.signaturePad.isEmpty() ? true : false;
  }
}

clear() {
  this.signaturePad.clear();
}

undo() {
  const data = this.signaturePad.toData();
  if (data) {
    data.pop(); // remove the last dot or line
    this.signaturePad.fromData(data);
  }
}

updateDelivery(id, ReceipientData){
  
  if(ReceipientData.ReceipientName == ""){
    this.alert.showAlert2("الرجاء إدخال إسم المستلم");
  // }else if(this.latitude == 0 || this.longitude == 0){
  //   this.alert.showAlert2("الرجاء الضغط على زر 'موقع التسليم' وإعادة المحاولة");
  }else if(ReceipientData.ReceipientSignature == null){
    this.alert.showAlert2("يرجى من المستلم التوقيع في المساحة المحددة والضغط على زر 'حفظ' وإعادة المحاولة");
  }else{
    // this.ReceipientData.Id = this.deliveryData.Id;
    this.ReceipientData.DeliveryCoordinates = `${this.latitude},${this.longitude}`;

    this.ReceipientData.deliveryDateTime = this.deliveryDateTime;
    this.ReceipientData.DriverId = this.loggedUser[0].PartyUserId;
    this.ReceipientData.OfficeSite = this.deliveryData.OfficeSite;

    this.ReceipientData.DeliveryInfoIds = this.deliveryData.DeliveryInfoId;

    console.log(this.ReceipientData);
     if(this.connectivity.isOnline()){
        this.http.put(apiIP + '/addReceipient/' + id, ReceipientData, this.handle.httpOptions)
        .subscribe((data) => {
          console.log(data);
          this.router.navigate(['tabs/tab1']).then(() => {
            this.alert.showAlert("تم إضافة المستلم بنجاح");
          })
          
          
        },error => {
          this.alert.showAlert2("لم تتم عملية إضافة المستلم الرجاء مراجعة مدير النظام");
          console.log(error.message);
          
        }),
        catchError(this.handle.handleError);
      }else{
        // loader.dismiss()
        this.alert.showAlert(connectionErorr);
      }
    
  }

}

}


