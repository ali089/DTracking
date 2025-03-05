import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";

import { Observable, BehaviorSubject, observable } from "rxjs";
import { first, catchError, tap, timeout } from "rxjs/operators";
import { NavigationExtras} from '@angular/router';
import { User } from "../models/User";
import { HandleerrService } from './handleerr.service';
import { apiIP, connectionErorr } from '../../main';
import { LoadingController, NavController } from '@ionic/angular';
import { ConnectivityService } from './connectivity.service';
import { AlartmsgService } from './alartmsg.service';
// import { ErrorHandlerService } from "./error-handler.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // private url = "http://localhost:3000/auth";

  isUserLoggedIn$ = new BehaviorSubject<boolean>(false);
  userId: Pick<User, "Id">;

user={};



  constructor(
    private http: HttpClient,
    private handle: HandleerrService,
    private router: Router,
    private navCtrl:NavController,
    public loadingCtr:LoadingController, 
    public connectivity:ConnectivityService,
    private alert:AlartmsgService
  ) { 
    // console.log(this.userId);
    type TokenAndId = {
      token: string;
      userId: Pick<User, "Id">;
    }
  }

  Id: number;
  PartyUserId: number;
  UserName: string;
  Password: string;
  Position: string;
  Department: string;
  FullName: string;
  UserType: string;


  signup(user: Omit<User, "Id">): Observable<User> {
    console.log(user);
    
    return this.http
      .post<User>(apiIP + '/signup' , user, this.handle.httpOptions)
      .pipe(
        first(),
        catchError(this.handle.handleError)
      );
  }

    
   async login(
    userName: Pick<User, "UserName">,
    password: Pick<User, "Password">
  ):Promise<Observable<{ token: string; userId: Pick<User, "Id">; }>> {

      if(this.connectivity.isOnline()){
      const loader = await this.loadingCtr.create({
        message: "الرجاء الانتظار...",
  
      });
       await loader.present();
        
        // console.log(this.userId);
        // console.log(userName + " " + password );
        const postedO = this.http.post<{ token: string; userId: Pick<User, "Id">; }>(`${apiIP}/login`, { userName, password }, this.handle.httpOptions) as Observable<{ token: string; userId: Pick<User, "Id">; }>
        return postedO.pipe(
            // timeout<any>(300000),
            first<any>(),
            tap((tokenObject: { token: string; userId: Pick<User, "Id"> }) => {
              this.userId = tokenObject.userId;
              //this.alert.showAlert(this.userId);
              localStorage.setItem("token", tokenObject.token);
              this.isUserLoggedIn$.next(true);
              //console.log(tokenObject.token);
              
              this.http.get(apiIP + '/loginUser/' + this.userId)
              .subscribe((user:any) => {
                // console.log(user);
                localStorage.setItem("userDetials", JSON.stringify(user));
                loader.dismiss();
                this.navCtrl.navigateForward('tabs');
                // console.log(user);
              })
              , (error) => {
                loader.dismiss();
                this.alert.showAlert2(error.error);
              }
            }
            , (error) => {
                loader.dismiss();
                this.alert.showAlert2(error.error);
                // console.log(error.error);
            }
            ),
            // catchError(
            //   this.handle.handleErrors<{
            //     token: string;
            //     userId: Pick<User, "Id">;
            //   }>("login")
            // )
              catchError(this.handle.handleError )
              // loader.dismiss();
              // this.alert.showAlert(this.handle.handleError)
          );
      }else{
        // loader.dismiss()
        this.alert.showAlert(connectionErorr);
      }
  }
}
