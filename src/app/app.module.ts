import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { FormPage } from '../pages/form/form';

// Import the Storage Modul for LocalStorage
import { Storage} from '@ionic/storage'

// Import the AF2 Module
import { AngularFireModule } from 'angularfire2'; 

// AF2 Settings 
export const firebaseConfig = {
  apiKey             : 'AIzaSyCxlrQTv0s9nKP-_t6btmgcf7_ogHhdHxo',
  authDomain         : 'crud-2f4a2.firebaseapp.com',
  databaseURL        : 'https://crud-2f4a2.firebaseio.com',
  storageBucket      : 'crud-2f4a2.appspot.com',
  messagingSenderId  : '145820518047'
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    FormPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    FormPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, Storage]
})
export class AppModule {}
