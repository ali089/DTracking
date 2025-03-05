import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { AlartmsgService } from './alartmsg.service';

@Injectable({
  providedIn: 'any'
})
export class HandleerrService {

  constructor(public http: HttpClient, public alart:AlartmsgService) { }

  //  handleErr(){

           // Http Options
           httpOptions = {
            headers: new HttpHeaders()
            .set('Content-Type', 'application/json; charset=utf-8')
            .set('Access-Control-Allow-Origin', '*')
          }
        
            // Handle API errors
            handleError(error: HttpErrorResponse) {
              if (error.error instanceof ErrorEvent) {
                // A client-side or network error occurred. Handle it accordingly.
                console.error('An error occurred:', error.error.message);
                // this.alart.showAlert(`An error occurred: ${error.error.message}`);
              } else {
                // The backend returned an unsuccessful response code.
                // The response body may contain clues as to what went wrong,
                console.error(
                  `Backend returned code ${error.status}, ` +
                  `body was: ${error.error}`);
                
                  // this.alart.showAlert(error.error);
              }
              // return an observable with a user-facing error message
              return throwError(
                'Something bad happened; please try again later.');
            };
  // }



  handleErrors<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      this.alart.showAlert(`${operation} failed: ${error.message}`);
      // this.alart.showAlert("الرجاء التأكد من اسم المستخدم أو كلمة المرور");
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

        
}
