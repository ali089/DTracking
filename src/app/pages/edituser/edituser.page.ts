import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { apiIP, connectionErorr } from '../../../main';
import { HandleerrService } from '../../providers/handleerr.service';
import { catchError } from 'rxjs/operators';
import { AlartmsgService } from '../../providers/alartmsg.service';
import { ConnectivityService } from 'src/app/providers/connectivity.service';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.page.html',
  styleUrls: ['./edituser.page.scss'],
})
export class EdituserPage implements OnInit {

  user:any = {
    UserName:"",
    PartyUserId:"",
    FullName:"",
    Position:"",
    Department:"",
    UserType:"",
    Phone:null,
    Email:"",
    Password:0,
    Repassword:0
  }

  data:any={};
  userId = null;

  showPassword = false;
  passwordToggleIcon = 'eye';


  PassForm:UntypedFormGroup;

        
  validations = {
    'username': [
      { type: 'required', message: 'Username is required' },
      { type: 'minlength', message: 'Username must be at least 5 characters long' },
      { type: 'maxlength', message: 'Username cannot be more than 25 characters long' },
      { type: 'pattern', message: 'Your username must contain only numbers and letters' },
      { type: 'validUsername', message: 'Your username has already been taken' }
    ],
    'email': [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Enter a valid email' }
    ],
    'confirm_password': [
      { type: 'required', message: 'Confirm password is required' },
      { type: 'areEqual', message: 'Password mismatch' }
    ],
    'Password': [
      // { type: 'required', message: 'Password is required' },
      // { type: 'minlength', message: 'Password must be at least 8 characters long' },
      // { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number' }
      { type: 'required', message: 'كلمة المرور مطلوبة' },
      { type: 'minlength', message: 'يجب أن لا تقل كلمة المرور عن 8 حروف' },
      { type: 'pattern', message: 'على الأقل تحتوي كلمة المرور على حرف واحد كبير ورمز ورقم' }
    ],
    'terms': [
      { type: 'pattern', message: 'You must accept terms and conditions' }
    ]
    }

    
  constructor(public route:ActivatedRoute, public navCtrl:NavController,
    public http:HttpClient, public handle:HandleerrService,
    public alert:AlartmsgService, public router:Router,
    public connectivity:ConnectivityService) {
      this.ionViewWillEnter();
   }

   ionViewWillEnter(){
    this.route.queryParams.subscribe(params =>{
      this.data = params;
      // this.userId = this.data.Id;
      // console.log(this.data.Id);
      this.getAppUserById(this.data);
    });
    this.PassForm = this.createFormGroup();
   }


  createFormGroup(): UntypedFormGroup{
    return this.PassForm =  new UntypedFormGroup({
      // DisplayName : new FormControl("", [Validators.required]),
      // UserName : new FormControl("", [Validators.required]),
      // Position : new FormControl("", [Validators.required]),
      // Department : new FormControl("", [Validators.required]),
      // Phone : new FormControl("", [Validators.required]),
      // UserType : new FormControl("", [Validators.required]),
      Password : new UntypedFormControl("", Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}')])),
      Repassword : new UntypedFormControl("", [Validators.required]),
      
    })

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

  getAppUserById(data){
    // console.log(data);
    if(this.connectivity.isOnline()){
    this.http.get(apiIP + "/UserById/" + data.Id)
    .subscribe((data) => {
      data[0].Password = "";
      this.user = data[0];
      console.log(this.user);
    })
  }else{
    // loader.dismiss()
    this.alert.showAlert(connectionErorr);
  }
  }

  updateUser(){
    if(this.connectivity.isOnline()){
      this.user.Password = this.PassForm.value.Password;
    console.log(this.user);
    this.http.put(apiIP + "/editUser/" + this.user.Id, this.user, this.handle.httpOptions)
    .subscribe((data) => {
      console.log(data);
      this.router.navigate(['/tabs/tab1']).then(() => {
        // window.location.reload();
      })
      this.alert.showAlert("تم التعديل بنجاح");
    // })
    // this.navCtrl.navigateForward('tabs/tab2');
    
  }, error => {
          catchError(this.handle.handleError)
        });
      
      }else{
        // loader.dismiss()
        this.alert.showAlert(connectionErorr);
      }
   
  }

  togglePassword(){
    this.showPassword = !this.showPassword;
    if(this.passwordToggleIcon == 'eye'){
      this.passwordToggleIcon = 'eye-off';
    }else{
      this.passwordToggleIcon = 'eye';
    }
  }
}
