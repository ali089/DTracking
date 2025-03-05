import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
// import { FormGroup } from '@angular/forms';
import { UntypedFormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  // loginForm:FormGroup;

  loginForm:UntypedFormGroup;


  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

//   ngOnInit(){
//     this.loginForm = new FormGroup({          
//           'name':new FormControl(null), //note, can have up to 3 Constructor Params: default value, validators, AsyncValidators
//           'email':new FormControl(null,Validators.email)

//      })
// }


}
