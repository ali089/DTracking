import { Component } from '@angular/core';
import { User } from '../models/User';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  userDetails = JSON.parse(localStorage.getItem('userDetials')) as User;
  userType = "";
  constructor() {
    this.userType = "";
    // console.log(this.userDetails);
    this.userType = this.userDetails[0].UserType;
  }

  
}
