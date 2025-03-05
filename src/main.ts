import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));

  export const apiIP="http://track.gsc.gov.om:3000/api";


  //export const apiIP="http://172.24.6.206:4000/api";
  //export const apiIP="http://10.201.226.7:3000/api";
  export const connectionErorr = "الرجاء التأكد من الاتصال بالشبكة";

