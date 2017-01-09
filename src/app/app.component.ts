import { Component, ViewChild } from '@angular/core';
import { Platform, LoadingController, MenuController, Nav } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';

import { Storage } from '@ionic/storage';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;

  rootPage : any;
  loader : any;
  pages: Array<{title: string}>;
  user : FirebaseListObservable<any>

  data : any = {
    username : '',
    email    : ''
  }

  constructor(platform: Platform,
              public storage: Storage,
              public loadingCtrl: LoadingController,
              public menu: MenuController,
              public af: AngularFire) {
    platform.ready().then(() => {  
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();

      this.setLoading()

      storage.get('username').then((username) => {
        
        console.log(username == null)
        if(username == null)
          this.rootPage = LoginPage
        else {
          this.data.username = username;
          this.user = af.database.list('/users/'+username)
          this.rootPage = HomePage

          this.user.subscribe(x => {
            this.data.email = x[0].$value
            console.log(x[0])
          })
        }

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

  doLogout(){
    this.storage.remove('username');
    this.nav.setRoot(LoginPage)
  }
}
