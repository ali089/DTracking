import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, LoadingController, ModalController, NavController } from '@ionic/angular';
import { NavigationExtras, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { apiIP, connectionErorr } from '../../main';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { AlartmsgService } from '../providers/alartmsg.service';
import { AuthService } from '../providers/auth.service';
import { User } from "../models/User";
import { HandleerrService } from '../providers/handleerr.service';
import { ConnectivityService } from '../providers/connectivity.service';
import { NewusermodalPage } from '../pages/newusermodal/newusermodal.page';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  deliveries:any=[];

  deliveryByDriver:any = [];
  selectedDeliveryByDriver:any = [];
  selectedDeliveries={
    id:0,
    corrNum:"",
    date:""

  };

  data:any = {};
  userDetails = JSON.parse(localStorage.getItem('userDetials')) as User;
  tokenDetails = localStorage.getItem('token');
  user = "";
  driverName = this.userDetails[0].FullName;
  driverId = null;

  readyToGoDateObj ={
    PartyUserId:null,
    DriverId:""
  } 

  lastDateStatus = {
    id:0,
    date:"",
    status:"",
  };

  readyToGoButton:boolean = true;
  enableButtons:boolean = false;

  date = new Date().toLocaleDateString()
  readyToGoDate = new Date().toLocaleString();

  users:any=[];
  editeduser:any={};

  page = 0;
  pageOfItems: Array<any>;
  resultsCount = 10;
  totalPages:number;


  // displayedColumns: string[] = ['م', 'رقم البريد', 'الجهة', 'الموقع', 'مرسلة إلى', 'اسم السائق', 'رقم هاتف السائق', 'الوقت / التاريخ', ''];
  // records:any = new MatTableDataSource;
  // length: number = 0;
  // pageSize = 5;
  // pageSizeOptions: number[] = [5, 10, 25, 100];
  // @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort;


  constructor(private navCtrl:NavController, public http: HttpClient,
    public alert:AlartmsgService, public route:ActivatedRoute, 
    public auth:AuthService, public handle:HandleerrService,
    public connectivity:ConnectivityService,public alertCtr:AlertController,
    public loadingCtr:LoadingController, public modalCtrl:ModalController) {
      // this.ionViewWillEnter();
  }
  // ngOnInit(): void {
  //   throw new Error('Method not implemented.');
  // }
  // ngAfterViewInit(): void {
 
  // }

  ionViewWillEnter(){
    this.user = "";
    console.log(this.userDetails);
    this.user = this.userDetails[0].UserType;
    console.log(this.user);
    
    this.driverId = this.userDetails[0].PartyUserId;

    this.getAllDeliveries();
    this.getDeliveriesByDriver(this.driverId);
    this.getAllUsers();

    this.selectedDeliveryByDriver = [];
  }
      
  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      this.ionViewWillEnter();
      event.target.complete();
    }, 2000);
  }

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
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
    // console.log(i.value);
    
    
  }

  async getAllDeliveries(){
  
          if(this.connectivity.isOnline()){
            const loader =await this.loadingCtr.create({
              message: "الرجاء الإنتظار ...",
            });
            await loader.present();
            this.http.get(`${apiIP}/delivery/?page=${this.page}&results=${this.resultsCount}`)
            .subscribe((data) => {
              // this.alert.showAlert(data);
              loader.dismiss();
              this.deliveries =data;
              console.log(this.deliveries);
  
          const sortedDeliveries = this.deliveries.pageResult.sort((a, b) => {
            return a.CurrentStatus - b.CurrentStatus || new Date(b.CurrentDateTime).getTime() - new Date(a.CurrentDateTime).getTime()
          });
          console.log(sortedDeliveries);
           
        }),
        loader.dismiss();
        catchError(this.handle.handleError);
      }else{
        // loader.dismiss()
        this.alert.showAlert(connectionErorr);
      }
  }

  nextPage(){
    if(this.page < this.deliveries.totalPages){
      this.page = this.deliveries.next.page;
      this.getAllDeliveries();
    }
    
  }

  prevPage(){
    if(this.page > 0){
      this.page = this.deliveries.previous.page;
      this.getAllDeliveries();
    }

  }

  goFirst(){
    this.page = 0;
    this.getAllDeliveries();
  }

  goLast(){
    // if(this.deliveries.totalPages == 1){
    //   this.page = this.deliveries.totalPages;
    //   this.getAllDeliveries();
    // }else{
      this.page = this.deliveries.totalPages - 1;
      this.getAllDeliveries();
    // }
    
  }

      // applyFilter(event: Event) {
      //   const filterValue = (event.target as HTMLInputElement).value;
      //   this.records.filter = filterValue.trim().toLowerCase();
      //   if (this.records.paginator) {
      //     this.records.paginator.firstPage();
      //   }
      // }

      async getDeliveriesByDriver(Id){
        if(this.connectivity.isOnline()){
        // this.readyToGoButton = false;
        const loader =await this.loadingCtr.create({
          message: "الرجاء الإنتظار ...",
        });
        await loader.present();
        this.http.get(apiIP + '/deliveryByDriver/'+ Id)
        .subscribe((data) => {
          // this.alart.showAlert(data);
          loader.dismiss();
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
        loader.dismiss();
      }else{
        // loader.dismiss()
        this.alert.showAlert(connectionErorr);
      }
      }

      async readyToGo(){
        if(this.connectivity.isOnline()){
        // this.readyToGoDateObj.PartyUserId = this.partyUserId;
        const loader =await this.loadingCtr.create({
          message: "الرجاء الإنتظار ...",
        });
        await loader.present();
        console.log(this.readyToGoDateObj);
        this.readyToGoButton = true;
        this.http.put(apiIP + '/addreadyToGoDate/'+ this.driverId , this.handle.httpOptions)
        .subscribe((data) => {
          // this.alart.showAlert(data);
          loader.dismiss();
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

      gotoDetails(i){

      let navExtras:NavigationExtras={
        queryParams:i
      }
      this.navCtrl.navigateForward('correspondencedetails',navExtras);
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

      async returnBack(deliv) {

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
              this.failedAlert(deliv);
            }else{
            //  alert(JSON.stringify(data));
            let returnedData:any = {
              id: deliv.DeliveryInfoId,
              note: data.notes,
              officeSite: deliv.OfficeSite
            }
            this.returnDeliveryByDriver(returnedData);
            }

          }
        }
      ]
    });
    await prompt.present();
  }

  async failedAlert(Deliv) {
    let alert = await this.alertCtr.create({
    header: 'سبب الإرجاع',
    message:'يرجى إدخال سبب الإرجاع',
    buttons: [{
    text: 'إرسال',
      handler: () => {
        this.returnBack(Deliv);
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

  /////////////////user type = admin//////////////////////////////////////////

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

  async getAllUsers(){
    if(this.connectivity.isOnline()){
      const loader =await this.loadingCtr.create({
        message: "الرجاء الإنتظار ...",
      });
      await loader.present();
      this.http.get(apiIP + "/appUsers")
      .subscribe((data) => {
        loader.dismiss();
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

  //////////////////////////////delete user//////////////////////////////////////////////
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
