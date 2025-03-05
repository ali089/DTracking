import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { NavigationExtras, ActivatedRoute } from '@angular/router';
import { NewusermodalPage } from '../newusermodal/newusermodal.page';
import { AuthService } from '../../providers/auth.service';
import { HttpClient } from '@angular/common/http';
import { HandleerrService } from '../../providers/handleerr.service';
import { apiIP, connectionErorr } from '../../../main';
import { catchError } from 'rxjs/operators';
import { AlartmsgService } from '../../providers/alartmsg.service';
import { ConnectivityService } from '../../providers/connectivity.service';

@Component({
  selector: 'app-manageusers',
  templateUrl: './manageusers.page.html',
  styleUrls: ['./manageusers.page.scss'],
})
export class ManageusersPage implements OnInit {

  users:any=[];
  editeduser:any={};
  constructor(public modalCtrl:ModalController, public navCtrl:NavController,
    public route:ActivatedRoute, public auth:AuthService,
    public http:HttpClient, public handle:HandleerrService,
    public alertCtr:AlertController, public alert:AlartmsgService,
    public connectivity:ConnectivityService) { 
      this.ionViewWillEnter();
  }

  ngOnInit() {
  }

  ionViewWillEnter(){

    this.getAllUsers();
    this.route.queryParams.subscribe(params =>{
      this.editeduser = params;
      console.log(this.editeduser);
      // console.log(this.users);
      // this.users.forEach(element => {
      //   if(element.data.username == this.editeduser.username){

      //   }
      // });
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
  
  async showNewUserModal(){
    const modal = await this.modalCtrl.create({
      component:NewusermodalPage
    });
    await modal.present();
    const data:any = await modal.onWillDismiss();
    if(data.role == "backdrop"){
      console.log(data);
    }else{
      this.auth.signup(data).subscribe((msg) => {
        console.log(msg);
        this.alert.showAlert("تمت عملية إضافة المستخدم بنجاح");
        // window.location.reload();
      }, error => {
        this.alert.showAlert("لم تتم عملية إضافة المستخدم بنجاح الرجاء مراجعة مدير النظام");
        console.log(error.error);
        
      });
      // this.users.push(data);
      // console.log(this.users);
    }
  }

  // signup(): void {
  //   this.auth.signup(this.signupForm.value).subscribe((msg) => {
  //     console.log(msg);
  //     this.router.navigate(["login"]);
  //   });
  // }

  getAllUsers(){
    if(this.connectivity.isOnline()){

      this.http.get(apiIP + "/appUsers")
      .subscribe((data) => {
        this.users = data;
        console.log(this.users);
        
      });
      catchError(this.handle.handleError);

    } else{
      this.alert.showAlert(connectionErorr);
    }

  }


  updateUserDetails(item){
    let navExtras:NavigationExtras = {
      queryParams:item
    }
    this.navCtrl.navigateForward('edituser',navExtras);
  }

  async presentAlertConfirm(userId) {
    // console.log(deliveryId);
    
    const alert = await this.alertCtr.create({
      cssClass: 'my-custom-class',
      header: 'تأكيد عملية حذف المستخدم',
      message: 'هل أنت متأكد من طلبك لحذف المستخدم',
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
          handler: () => {
            console.log(userId);
            this.deleteUsers(userId)
          }
        }
      ]
    });

    await alert.present();
  }

  deleteUsers(i){
    if(this.connectivity.isOnline()){

      this.http.delete(apiIP + '/deleteUser/' + i)
      .subscribe((data) => {
        // window.location.reload();
        this.alert.showAlert("تمت عملية الحذف بنجاح");
      });
      catchError(this.handle.handleError);
    } else{
      this.alert.showAlert(connectionErorr);
    }

  }

}

