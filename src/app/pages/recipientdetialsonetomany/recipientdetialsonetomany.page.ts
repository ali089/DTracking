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
  selector: 'app-recipientdetialsonetomany',
  templateUrl: './recipientdetialsonetomany.page.html',
  styleUrls: ['./recipientdetialsonetomany.page.scss'],
})
export class RecipientdetialsonetomanyPage implements OnInit, AfterViewInit {
  @ViewChild('canvas', { static: true }) signaturePadElement;

  signaturePad: any;
  canvasWidth: number;
  canvasHeight: number;

  deliveryData:any = [];
  deliveryDataArray = [];
  deliveryIds = {};
  deliveryInfoIds = [];

  userDetails = JSON.parse(localStorage.getItem('userDetials')) as User;
  driverId = this.userDetails[0].PartyUserId;

  latitude: any = 0; //latitude
  longitude: any = 0; //longitude
  address: string;

  deliveryDateTime = new Date().toLocaleString();

  ReceipientData = {
    Ids:[],
    DeliveryInfoIds:"",
    ReceipientName:"",
    ReceipientId:"",
    ReceipientSignature:null,
    DeliveryCoordinates:"",
    deliveryDateTime:null,
    DriverId:null,
    OfficeSite:""
  }

  constructor(public route:ActivatedRoute, private base64ToGallery: Base64ToGallery,
    private androidPermissions: AndroidPermissions, private elementRef: ElementRef,
    private geolocation: Geolocation, private nativeGeocoder: NativeGeocoder,
    public alert:AlartmsgService, public http:HttpClient,
    public handle:HandleerrService, public router:Router,
    public connectivity:ConnectivityService, public alertCtr:AlertController) {

    // this.ngAfterViewInit();
       
   }

  ngAfterViewInit(): void {
    this.route.queryParams.subscribe((params:any)=>{
      this.deliveryData = params;
      //this.deliveryDataArray = this.deliveryData

    })


    this.signaturePad = new SignaturePad(this.signaturePadElement.nativeElement);
    this.signaturePad.clear();
    this.signaturePad.penColor = 'rgb(56,128,255)';

  }

  ngOnInit():void {
    this.init()
  }

  options = {
    timeout: 10000, 
    enableHighAccuracy: true, 
    maximumAge: 3600
  };


    // use geolocation to get user's device coordinates
    getCurrentCoordinates(ReceipientData) {
      if(this.connectivity.isOnline()){
      this.geolocation.getCurrentPosition().then((resp) => {
        this.latitude = resp.coords.latitude;
        this.longitude = resp.coords.longitude;
        
        // this.getAddress(this.latitude,this.longitude);
        // this.data.Latitude = this.latitude;
        // console.log(this.ReceipientData.Latitude);
        this.updateDelivery(ReceipientData)
        // this.data.Longitude = this.longitude;
       }).catch((error) => {
         console.log('Error getting location', error);
       });
      }else{
        // loader.dismiss()
        this.alert.showAlert(connectionErorr);
      }
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
      // console.log(window.innerWidth);
      // console.log(window.innerHeight );
      // console.log(canvas.width );
      // console.log(canvas.height );
      
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
    
    updateDelivery(ReceipientData){
      // this.ReceipientData.Ids = this.deliveryData;
      // console.log(this.ReceipientData.Ids);
      
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
        this.ReceipientData.DriverId = this.userDetails[0].PartyUserId;
        // this.ReceipientData.OfficeSite = this.deliveryData[0].OfficeSite;

        Object.values(this.deliveryData).forEach((delivery:any) => {
          this.ReceipientData.Ids.push(delivery.Id)
          this.deliveryInfoIds.push(delivery.DeliveryInfoId)

          if(this.ReceipientData.OfficeSite == null){
            this.ReceipientData.OfficeSite = delivery.OfficeSite;
          }
         
        })
    
        this.deliveryIds = (this.ReceipientData.Ids).toString();
        this.ReceipientData.DeliveryInfoIds = (this.deliveryInfoIds).toString();

        console.log(this.deliveryIds);
        console.log(this.ReceipientData.DeliveryInfoIds);


         if(this.connectivity.isOnline()){
            this.http.put(apiIP + '/addReceipient/' + this.deliveryIds, ReceipientData, this.handle.httpOptions)
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
