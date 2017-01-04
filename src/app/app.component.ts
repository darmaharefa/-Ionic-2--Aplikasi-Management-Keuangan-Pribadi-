import { Component } from '@angular/core';
import { Platform, LoadingController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';

import { Storage } from '@ionic/storage';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage : any;
  loader : any;

  constructor(platform: Platform, public storage: Storage, public loadingCtrl: LoadingController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();

      this.setLoading()

      storage.get('username').then((x) => {
        
        console.log(x == null)
        if(x == null)
          this.rootPage = LoginPage
        else
          this.rootPage = HomePage
      })

      this.loader.dismiss()

     
    });
  }

  setLoading(){
    this.loader = this.loadingCtrl.create({
      content : "Authenticating..",
      delay : 2000
    });

    this.loader.present()
  }
}
