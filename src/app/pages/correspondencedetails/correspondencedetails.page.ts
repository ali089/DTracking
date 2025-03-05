import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { HttpClient} from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { apiIP, connectionErorr } from '../../../main';
import { AlartmsgService } from '../../providers/alartmsg.service';
import { HandleerrService } from '../../providers/handleerr.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ConnectivityService } from 'src/app/providers/connectivity.service';
//import { type } from 'os';


@Component({
  selector: 'app-correspondencedetails',
  templateUrl: './correspondencedetails.page.html',
  styleUrls: ['./correspondencedetails.page.scss'],
})
export class CorrespondencedetailsPage implements OnInit {

  public data:any = {};
  public delivryDetails = {};

  public imageurl:any = "";
  public deliveryId = "";
  public deliveryInfoId = "";
  
  public statusType ={
    statusName:"",
    statusTime:"",
  
  }

  public status:any = [];
  constructor(public route:ActivatedRoute, private navCtrl:NavController, public http: HttpClient,
    public alart:AlartmsgService, public handle:HandleerrService,private sanitizer: DomSanitizer,
    public connectivity:ConnectivityService) {
      // this.ionViewWillEnter();
   }

   ionViewWillEnter(){
    this.route.queryParams.subscribe(params =>{
      this.deliveryId = params.Id;
      this.deliveryInfoId = params.DeliveryInfoId;
      // this.deliveryId =this.data.Id;
       console.log(this.deliveryInfoId);
  
      this.getDeliveryDetails(this.deliveryInfoId);
      this.getDeliveryStatus(this.deliveryInfoId);
    });
   }

   doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      this.ionViewWillEnter();
      event.target.complete();
    }, 2000);
  }


  ngOnInit() {
  }

  getDeliveryDetails(id){
    if(this.connectivity.isOnline()){
      this.http.get(apiIP + '/deliveryDetails/'+ id)
      .subscribe((data) => {
        console.log(data);
        
        this.data =data[0];
  
        // console.log(this.data);
        const img = this.data.ReceipientSignature.data;

        if(this.data.DeliveryCoordinates != null){
          const location = `http://www.google.com/maps/place/${this.data.DeliveryCoordinates}`
        }else{
          location = null;
        }
        
        // console.log(location);
  
      var binary = '';
      let bytes = new Uint8Array(img);
      var length = bytes.byteLength;
      for (var i=0; i< length; i++)
      {
        binary += String.fromCharCode(bytes[i]);
      }
      this.imageurl = binary;
  
       }),
      catchError(this.handle.handleError);
    }else{
      // loader.dismiss()
      this.alart.showAlert(connectionErorr);
    }
    

  }

  getDeliveryStatus(id){
    //console.log(id);
    
    if(this.connectivity.isOnline()){
    this.http.get(apiIP + '/status/'+ id)
    .subscribe((data) => {
      console.log(data);
      
      this.status =data;
      const sortedStatus = this.status.sort((a,b) => {
        return new Date(a.DateTime).getTime() - new Date(b.DateTime).getTime();
      })
      console.log(sortedStatus);
      
    }),
    catchError(this.handle.handleError);
  }else{
    // loader.dismiss()
    this.alart.showAlert(connectionErorr);
  }
  }

}
