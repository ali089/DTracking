import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, LoadingController } from '@ionic/angular';
import { ConnectivityService } from '../../providers/connectivity.service';
import { AlartmsgService } from '../../providers/alartmsg.service';
import { NavigationExtras, Router } from '@angular/router';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { AuthService } from '../../providers/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  // public users = {
  //   userName:"231ali",
  //   password:"123123",
  //   userType:"trasportationUser"
  // }


  PassForm: UntypedFormGroup;
  loginBy:any = "";

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
      { type: 'required', message: 'كلمة المرور مطلوبة' },
      { type: 'minlength', message: 'يجب أن لا تقل كلمة المرور عن 8 حروف' },
      { type: 'pattern', message: 'على الأقل تحتوي كلمة المرور على حرف واحد كبير ورمز ورقم' }
    ],
    'terms': [
      { type: 'pattern', message: 'You must accept terms and conditions' }
    ]
    }

  constructor(private navCtrl:NavController,public alertCtr:AlertController,
    public loadingCtr:LoadingController, public connectivity:ConnectivityService,
    private alart:AlartmsgService, private router:Router, private auth:AuthService) { }

  ngOnInit() {
    this.PassForm = this.createFormGroup();
  }

  createFormGroup(): UntypedFormGroup{
    return this.PassForm =  new UntypedFormGroup({
      userName : new UntypedFormControl("", [Validators.required]),
      Password : new UntypedFormControl("", Validators.compose([
        Validators.required])),
        // Validators.minLength(8),
        // Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}')])),
    })
  }

  async login() {

    (await (this.auth
       .login(this.PassForm.value.userName, this.PassForm.value.Password)))
      .subscribe();




  // async login(){
  //   console.log("login page");
  //   this.navCtrl.navigateForward(['tabs']);
  //   if(this.connectivity.isOnline()){
  //     const loader = await this.loadingCtr.create({
  //       message: "Please wait...",
  
  //     });
  //     await loader.present();
  //   if(this.users.userName=="231ali" && this.users.password=="123123"){
  //       loader.dismiss();
  //       // this.alart.showAlert(this.users.userType);
  //       // alert(JSON.stringify(this.users));
  //       let navExtras:NavigationExtras = {
  //         state:{user:this.users}
  //       }
  //       this.router.navigate(['tabs'],navExtras)
  //       // this.navCtrl.navigateForward(['tabs'],navExtras);
  //       // this.alart.showAlert(navExtras);
        
  
  }



  // async sendEmail() {
  //   if(this.connectivity.isOnline()){}
  //   const prompt = await this.alertCtr.create({
  //     header: 'Forgot Password',
  //     message: "Enter your Email to send reset link",
  //     inputs: [
  //       {
  //         name: 'mail',
  //         placeholder: 'Enter your Email'
  //       },
  //     ],
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         handler: data => {
  //           console.log('Cancel clicked');
  //         }
  //       },
  //       {
  //         text: 'Send',
  //         handler: data => {
  //           //  alert(JSON.stringify(data));
  //           this.sendResetLink(data.mail);
  //         }
  //       }
  //     ]
  //   });
  //   await prompt.present();
  // }

  // async sendResetLink(email) {
  //   // const loader =await this.loadingCtr.create({
  //   //   message: "Please wait..",
  //   // });
  //   // await loader.present();
  //   // this.ngFAuth.auth.sendPasswordResetEmail(email)
  //   //   .then((user) => {
  //   //     loader.dismiss();
  //   //     this.showAlert("Password reset link sent successfully")
  //   //   }).catch((error) => {
  //   //     loader.dismiss();
  //   //     this.showAlert(error.message);
  //   //   });
  // }
}
