import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';

import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';

import { Storage } from '@ionic/storage'

/*
  Generated class for the Register page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  frmRegistrasi : any = {username : '',email:'', password:''}

  users 			    : FirebaseListObservable<any>

  constructor(	public navCtrl: NavController,
  				public navParams: NavParams,
  				public af: AngularFire,
  				public alertCtrl: AlertController,
  				public loadingCtrl: LoadingController,
          public storage: Storage) 
  {
  	this.users 	= af.database.list('/users')
  }

  ionViewDidLoad() {
    console.log('Register Loaded');
  }


  toLoginPage(){
    this.navCtrl.push(LoginPage)
  }

  doRegister(){

    if( this.frmRegistrasi.username === '' || 
        this.frmRegistrasi.email    === '' ||
        this.frmRegistrasi.password === ''){

      let alert    = this.alertCtrl.create({
        title  : "Warning!",
        subTitle: "form harus diisi",
        buttons  : ["ok"]
      })
      alert.present()

    }else{

    	let that = this

    	let data 		= {email : '', password : ''};
    	data.email 		= this.frmRegistrasi.email
    	data.password 	= this.frmRegistrasi.password

    	let loading 	= this.loadingCtrl.create({
    		content : "Create Account...",
    		delay	: 2000		
    	})

    	let alert		= this.alertCtrl.create({
    		title	: "Warning!",
    		subTitle: "username yang anda masukkan sudah pernah terdaftar",
    		buttons	: ["ok"]
    	})

    	loading.present()

    	this.users.$ref.ref.child(this.frmRegistrasi.username).once('value', function(snapshot){
    		if(snapshot.exists()){
    			console.log('data sudah ada')
    			console.log(snapshot)
    			alert.present()
    		}
    		else{
    			loading.dismiss()
    			snapshot.ref.parent.child(that.frmRegistrasi.username).set(data)
          that.storage.remove('username')
          that.storage.set('username', that.frmRegistrasi.username).then(()=> {console.log('Storage berhasil disimpan')})
    			that.navCtrl.setRoot(HomePage)
    		}
    	})
    }
  }

}
