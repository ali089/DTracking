import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { User } from 'src/app/models/User';


@Component({
  selector: 'app-resetpass',
  templateUrl: './resetpass.page.html',
  styleUrls: ['./resetpass.page.scss'],
})
export class ResetpassPage implements OnInit {

  userId: Pick <User, "Id">  
  
  user={
    Password:""
  }

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
      { type: 'required', message: 'كلمة المرور مطلوبة' },
      { type: 'minlength', message: 'يجب أن لا تقل كلمة المرور عن 8 حروف' },
      { type: 'pattern', message: 'على الأقل تحتوي كلمة المرور على حرف واحد كبير ورمز ورقم' }
      // { type: 'required', message: 'Password is required' },
      // { type: 'minlength', message: 'Password must be at least 8 characters long' },
      // { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number' }
    ],
    'terms': [
      { type: 'pattern', message: 'You must accept terms and conditions' }
    ]
    }


  constructor( public modalCtrl:ModalController) { }

  ngOnInit() {
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
  

  resetPass(){
    this.user.Password = this.PassForm.value.Password;
    this.modalCtrl.dismiss(this.user, 'reset password');
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
