import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { apiIP, connectionErorr } from '../../../main';
import { HandleerrService } from '../../providers/handleerr.service';
import { catchError } from 'rxjs/operators';
import { AlartmsgService } from '../../providers/alartmsg.service';
import { ConnectivityService } from 'src/app/providers/connectivity.service';
import { IonicSelectableComponent } from 'ionic-selectable';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';

class AgendaUser {
  public id:any;
  public name:string;
 }

@Component({
  selector: 'app-newusermodal',
  templateUrl: './newusermodal.page.html',
  styleUrls: ['./newusermodal.page.scss'],
})
export class NewusermodalPage implements OnInit {

  user:any = {
    UserName:"",
    PartyUserId:"",
    Position:"",
    FullName:"",
    Department:"",
    UserType:"",
    Phone:"",
    Email:"",
    Password:"",
    Repassword:""
  }

  Users:any = [];

  showPassword = false;
  passwordToggleIcon = 'eye';

         // Declare the variable (in this case and initialize it with false)
         isItemAvailable = false;
         items = [];
         agendaUsers: AgendaUser[];
         agendaUser: AgendaUser;
         searchTerm:string;

  
        //  const matchingpasswordsgroup = new FormGroup({
        //   password: new FormControl('', Validators.compose([
        //     Validators.minLength(5),
        //     Validators.required,
        //     Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
        //   ])),
        //   confirm_password: new FormControl('', Validators.required)
        // }, (formGroup: FormGroup) => {
        //   return PasswordValidator.areNotEqual(formGroup);
        // });

        RegisterForm:UntypedFormGroup;

        
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
            { type: 'required', message: 'Password is required' },
            { type: 'minlength', message: 'Password must be at least 8 characters long' },
            { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number' }
          ],
          'terms': [
            { type: 'pattern', message: 'You must accept terms and conditions' }
          ]
          }

  constructor(public modalCtrl:ModalController, public http:HttpClient, public handle:HandleerrService,
    public connectivity:ConnectivityService, private alert:AlartmsgService) { }

  ngOnInit() {
    this.getUsers();
    // this.agendaUsers = [
    //   {id:1, name:"ali"},
    //   {id:2, name:"Sami"},
    //   {id:3, name:"Khulood"}
    // ];
    this.RegisterForm = this.createFormGroup();
  }

  createFormGroup(): UntypedFormGroup{
    return this.RegisterForm =  new UntypedFormGroup({
      // FullName : new FormControl("", [Validators.required]),
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

  getUsers(){
    if(this.connectivity.isOnline()){
    this.http.get(apiIP + '/systemUsers')
    .subscribe((data) => {
      // console.log(data);
      this.Users =data;
      this.agendaUsers = this.Users
      // this.usersfullName = this.Users.FullName;
      console.log(this.Users);

      // this.Users.forEach(user => {
      //   this.agendaUser.id = user.Id;
      //   this.agendaUser.name = user.FullName;
      //   console.log(this.agendaUser);
        
      //   this.agendaUsers.push(this.agendaUser)
        
        
      //  });
       console.log(this.agendaUsers);
    }),
    catchError(this.handle.handleError);
  }else{
    // loader.dismiss()
    this.alert.showAlert(connectionErorr);
  }
  }


  dismissModal(){
    this.modalCtrl.dismiss(null, 'cancel');
  }
  
  newUser(){
    this.user.Password = this.RegisterForm.value.Password;
    console.log(this.user);
    
    this.modalCtrl.dismiss(this.user, 'add new user');
  }

  togglePassword(){
    this.showPassword = !this.showPassword;
    if(this.passwordToggleIcon == 'eye'){
      this.passwordToggleIcon = 'eye-off';
    }else{
      this.passwordToggleIcon = 'eye';
    }
  }


  userChange(ev:{
    component: IonicSelectableComponent,
    value:any
    }){
      console.log('agendaUser: ', ev.value);
      this.user = ev.value;
      this.RegisterForm.value.FullName = ev.value.FullName;
      
      // this.user.UserName = ev.value.UserName;
      // this.user.Phone = ev.value.Phone;
      // this.user.Position = ev.value.nameAr;
      
      console.log(this.RegisterForm.value.FullName);
      

        
  }



      //  initializeItems(){
           

      //      this.Users.forEach(user => {
      //       this.usersfullName = user.FullName
      //       console.log(this.usersfullName);
            
      //      });
      //  }
  
      //  getItems(ev: any) {
      //      // Reset items back to all of the items
           
  
      //      // set val to the value of the searchbar
      //      const val = ev.target.value;
      //   // console.log(val);
        
      //      //if the value is an empty string don't filter the items
      //      if (val && val.trim() !== '') {
      //          this.isItemAvailable = true;
      //          this.usersfullName = this.usersfullName.filter((User) => {
      //              return (User.toLowerCase().indexOf(val.toLowerCase()) > -1);
      //          })
      //      } else {
      //          this.isItemAvailable = false;
      //      }
      //  }

}
