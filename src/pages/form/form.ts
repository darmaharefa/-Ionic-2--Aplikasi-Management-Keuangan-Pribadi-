import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';

import { Storage } from '@ionic/storage';
import { AngularFire, FirebaseListObservable} from 'angularfire2';

import { HomePage } from '../home/home'




@Component({
  selector: 'page-form',
  templateUrl: 'form.html'
})
export class FormPage {

  username			  : any;
  typeTransaksi 	: any = 'pengeluaran';

  frmPemasukan 		: any = {
                            jumlah    : '',
                            jenis     : 'Gaji',
                            catatan   : '',
                            tanggal   : '',
                            jam       : ''
                          }

  frmPengeluaran 	: any = {
                            jumlah : '',
                            jenis : 'Konsumsi',
                            catatan : '',
                            tanggal : '',
                            jam : ''
                          }

  pemasukan  : FirebaseListObservable<any[]>
  pengeluaran : FirebaseListObservable<any[]>

  constructor(	public navCtrl: NavController,
  				      public navParams: NavParams,
  				      public af: AngularFire,
  				      public storage: Storage,
                public alertCtrl: AlertController,
                public loadingCtrl: LoadingController) 
  {
  	this.username = storage.get('username').then((user)=>{
  		console.log(user)
      this.pemasukan   = af.database.list('/pemasukan/'+user)
  		this.pengeluaran = af.database.list('/pengeluaran/'+user)
  	})
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FormPage');
  }

  doPemasukan(){
    let loading   = this.loadingCtrl.create({
        content  : "Menambahkan...",
        delay    : 2000
    })

    if( this.frmPemasukan.jumlah  === '' ||
        this.frmPemasukan.catatan === '' ||
        this.frmPemasukan.tanggal === '' ||
        this.frmPemasukan.jam     === ''){
      console.log('Input Salah !')

      let alert    = this.alertCtrl.create({
        title  : "Warning!",
        subTitle: "inputan salah",
        buttons  : ["ok"]
      })

      alert.present()
    } else{

      loading.present()
    	console.log('pemasukan added', this.frmPemasukan)
    	this.pemasukan.push(this.frmPemasukan)
    }

    this.navCtrl.pop()

    loading.dismiss()

  }

  doPengeluaran(){
  	let loading   = this.loadingCtrl.create({
        content  : "Menambahkan...",
        delay    : 2000
    })

    if( this.frmPengeluaran.jumlah  === '' ||
        this.frmPengeluaran.catatan === '' ||
        this.frmPengeluaran.tanggal === '' ||
        this.frmPengeluaran.jam     === ''){
      console.log('Input Salah !')

      let alert    = this.alertCtrl.create({
        title  : "Warning!",
        subTitle: "inputan salah",
        buttons  : ["ok"]
      })

      alert.present()
    } else{

      
      loading.present()

      console.log('pemasukan added', this.frmPengeluaran)

      this.pengeluaran.push(this.frmPengeluaran)
  }

  loading.dismiss()
  this.navCtrl.pop()

}

}
