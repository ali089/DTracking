import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//import { RouteReuseStrategy, RouterModule, ROUTES, provideRouter } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Network } from '@ionic-native/network/ngx';
import { QRScanner } from '@ionic-native/qr-scanner/ngx';
import { HttpClientModule, provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
// geolocation and native-geocoder
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { IonicSelectableModule } from 'ionic-selectable';
import { QRCodeModule } from 'angularx-qrcode';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        //RouterModule.forRoot(ROUTES),
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        CommonModule,
        FormsModule
    ],
    providers: [
        StatusBar,
        Network,
        QRScanner,
        Geolocation,
        NativeGeocoder,
        IonicSelectableModule,
        QRCodeModule,
        SplashScreen,
        Base64ToGallery,
        AndroidPermissions,
        // { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        provideHttpClient(withInterceptorsFromDi())
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
