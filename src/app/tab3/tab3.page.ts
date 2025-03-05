import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { AuthService } from '../providers/auth.service';
import { User } from "../models/User";
import { ResetpassPage } from '../pages/resetpass/resetpass.page';
import { AlartmsgService } from '../providers/alartmsg.service';
import { HttpClient } from '@angular/common/http';
import { HandleerrService } from '../providers/handleerr.service';
import { ConnectivityService } from '../providers/connectivity.service';
import { apiIP, connectionErorr } from '../../main';
import { catchError } from 'rxjs/operators';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  userDetails = JSON.parse(localStorage.getItem('userDetials')) as User;
  userId='';


  constructor(private navCtrl:NavController, public auth:AuthService,
    public modalCtrl:ModalController, public alert:AlartmsgService,
    public route:ActivatedRoute,public http:HttpClient,
    public handle:HandleerrService, public connectivity:ConnectivityService,
    public router:Router,) {
    
      // this.platform.backButton.subscribeWithPriority(0,()=>{
      //   document.getElementsByTagName("body")[0].style.opacity = "1";
      //   this.scanSub.unsubscribe();
      // })
      this.userId = this.userDetails[0].Id;
   }


  // startScanning(){
  //   // Optionally request the permission early
    
  //   this.qrScanner.prepare()
  //     .then((status: QRScannerStatus) => {
  //       if (status.authorized) {
  //         // camera permission was granted
  //         this.qrScanner.show();
  //         document.getElementsByTagName("body")[0].style.opacity = "0";

  //         // start scanning
  //           this.scanSub = this.qrScanner.scan().subscribe((text: string) => {
  //           // console.log('Scanned something', text);
  //           document.getElementsByTagName("body")[0].style.opacity = "1";
  //           this.qrScanner.hide(); // hide camera preview
  //           this.scanSub.unsubscribe(); // stop scanning
  //           this.alart.showAlert(text);
  //         },(err)=>{
  //           this.alart.showAlert(JSON.stringify(err));
  //         });

  //       } else if (status.denied) {
  //         // camera permission was permanently denied
  //         // you must use QRScanner.openSettings() method to guide the user to the settings page
  //         // then they can grant the permission from there
  //       } else {
  //         // permission was denied, but not permanently. You can ask for permission again at a later time.
  //       }
  //     })
  //     .catch((e: any) => this.alart.showAlert(JSON.stringify(e)));
  // }

  logout(): void {
    localStorage.removeItem("userDetials");
    this.auth.isUserLoggedIn$.next(false);
    this.router.navigate(["/login"]).then(() => {
      window.location.reload();
    });
    console.log(localStorage.getItem("userDetials"));
    
  }

  async resetPass(){

    const modal = await this.modalCtrl.create({
      component:ResetpassPage
    });
    await modal.present();
    const data:any = await modal.onWillDismiss();
    if(data.role == "backdrop"){
      console.log(data);
    }else{

      if(this.connectivity.isOnline()){
        console.log(data.data);
        console.log(this.userId);
        
        this.http.put(apiIP + "/resetPass/" + this.userId, data.data, this.handle.httpOptions)
        .subscribe((data) => {
          console.log(data);
          // this.router.navigate(['/tabs/tab1']).then(() => {
          //   // window.location.reload();
          // })
          this.alert.showAlert("تمت عملية إعادة كلمة المرور بنجاح");
        // })
        // this.navCtrl.navigateForward('tabs/tab2');
        
      }, error => {
              catchError(this.handle.handleError)
            });
          
          }else{
            // loader.dismiss()
            this.alert.showAlert(connectionErorr);
          }
      // this.auth.signup(data).subscribe((msg) => {
      //   console.log(msg);
      //   this.alert.showAlert("تمت عملية إعادة كلمة المرور بنجاح");
      //   // window.location.reload();
      // }, error => {
      //   this.alert.showAlert("لم تتم عملية إعادة كلمة المرور بنجاح الرجاء مراجعة مدير النظام");
      //   console.log(error.error);
        
      // });
      // this.users.push(data);
      // console.log(this.users);
    }

  }



}
