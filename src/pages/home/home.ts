import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ActionSheetController } from 'ionic-angular';

import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { FormPage } from '../form/form';
import { Storage } from '@ionic/storage';



/*
  Generated class for the Home page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  pemasukan    : FirebaseListObservable<any[]>;
  pengeluaran  : FirebaseListObservable<any[]>;

  details      : any = {
    totalPemasukan   : 0,
    countPemasukan   : 0,
    totalPengeluaran : 0,
    countPengeluaran : 0
  }

  saldo        : any = 0;

  username     : any;

  typeHome     : any = "details"

  constructor(	public navCtrl: NavController,
        				public navParams: NavParams, 
        				public af: AngularFire,
        				public alertCtrl: AlertController,
        				public actionSheetCtrl: ActionSheetController,
                public storage: Storage
        			)
  {
     // this.doFetch()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    this.doFetch();
  }

  doFetch(){
    this.username = this.storage.get('username').then((user)=>{
       this.pemasukan   = this.af.database.list('/pemasukan/'+user);
       this.pengeluaran = this.af.database.list('/pengeluaran/'+user);


       // Hitung Total Pemasukan
       let tempX = 0;
       let tempY = 0;
        this.pemasukan.subscribe(snapshot => {
         snapshot.forEach(snapshot => {
           tempX += parseInt(snapshot.jumlah)
           tempY += 1;
         })

         this.details.totalPemasukan = tempX;
         this.details.countPemasukan = tempY;
         tempX = 0;
         tempY = 0;

         console.log('total pemasukan : ', this.details.totalPemasukan)
         console.log('count pemasukan : ', this.details.countPemasukan)

         this.saldo = this.details.totalPemasukan - this.details.totalPengeluaran
         console.log('saldo :', this.saldo)
        })

        // Hitung Total Pengeluaran
       let tempA = 0;
       let tempB = 0;
        this.pengeluaran.subscribe(snapshot => {
         snapshot.forEach(snapshot => {
           tempA += parseInt(snapshot.jumlah)
           tempB += 1;
         })

         this.details.totalPengeluaran = tempA;
         this.details.countPengeluaran = tempB;
         tempA = 0;
         tempB = 0;

         console.log('total pengeluaran : ', this.details.totalPengeluaran)
         console.log('count pengeluaran : ', this.details.countPengeluaran)

         this.saldo = this.details.totalPemasukan - this.details.totalPengeluaran
         console.log('saldo :', this.saldo)
        })

     })
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.doFetch();

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  toFormPage(){
    this.navCtrl.push(FormPage)
  }

  removePemasukan(itemId, item){

    this.pemasukan.remove(itemId)
  }

  removePengeluaran(itemId){
  	this.pengeluaran.remove(itemId)
  }

  updatePemasukan(itemId, item){
  	let prompt = this.alertCtrl.create({
  		title	: item.jenis,
	    message	: "Edit data",
	    inputs	: [
	      {
          type   : 'number',
	        name		: 'jumlah',
	        placeholder	: 'Jumlah',
	        value: item.jumlah
	      },
         {
          type: 'text',
          label : 'Catatan',
          name    : 'catatan',
          placeholder  : 'Catatan',
          value: item.catatan
        },
        {
          type: 'date',
          name    : 'tanggal',
          placeholder  : 'Tanggal',
          value: item.tanggal
        },
        {
          type: 'time',
          name    : 'jam',
          placeholder  : 'jam',
          value: item.jam
        }
	    ],
	    buttons	: [
	      {
	        text	: 'Cancel',
	        handler	: data => {
	          console.log('Cancel clicked');
	        }
	      },
	      {
	        text	: 'Save',
	        handler	: data => {
	          this.pemasukan.update(itemId, {
	            jumlah : data.jumlah,
              catatan : data.catatan,
              tanggal : data.tanggal,
              jam : data.jam,
	          });
	        }
	      }
	    ]
	  })

    prompt.present()
  }

  updatePengeluaran(itemId, item){
    let prompt = this.alertCtrl.create({
      title  : item.jenis,
      message  : "Edit data",
      inputs  : [
        {
          type   : 'number',
          name    : 'jumlah',
          placeholder  : 'Jumlah',
          value: item.jumlah
        },
         {
          type: 'text',
          label : 'Catatan',
          name    : 'catatan',
          placeholder  : 'Catatan',
          value: item.catatan
        },
        {
          type: 'date',
          name    : 'tanggal',
          placeholder  : 'Tanggal',
          value: item.tanggal
        },
        {
          type: 'time',
          name    : 'jam',
          placeholder  : 'Jam',
          value: item.jam
        }
      ],
      buttons  : [
        {
          text  : 'Cancel',
          handler  : data => {
            console.log('Cancel clicked');
          }
        },
        {
          text  : 'Save',
          handler  : data => {
            this.pengeluaran.update(itemId, {
              jumlah : data.jumlah,
              catatan : data.catatan,
              tanggal : data.tanggal,
              jam : data.jam,
            });
          }
        }
      ]
    })


  	prompt.present()
  }

}

