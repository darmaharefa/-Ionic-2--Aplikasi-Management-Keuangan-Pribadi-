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
    countPengeluaran : 0,
    saldo            : 0
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
   
     this.username = this.storage.get('username').then((user)=>{
       console.log(user)
       this.pemasukan   = af.database.list('/pemasukan/'+user);
       this.pengeluaran = af.database.list('/pengeluaran/'+user);


     //   // Hitung Total Pemasukan
     //    this.pemasukan.subscribe(snapshot => {
     //     snapshot.forEach(snapshot => {
     //       console.log('2',snapshot.jumlah)
     //       this.details.totalPemasukan += parseInt(snapshot.jumlah);
     //       this.details.countPemasukan += 1;
     //     })

     //     console.log('3', this.details)
     //    })

     //   // Hitung Total Pengeluaran
     //    this.pengeluaran.subscribe(snapshot => {
     //     snapshot.forEach(snapshot => {
     //       console.log('4',snapshot.jumlah)
     //       this.details.totalPengeluaran += parseInt(snapshot.jumlah);
     //       this.details.countPengeluaran += 1;
     //     })

     //     this.details.saldo = this.details.totalPemasukan - this.details.totalPengeluaran

     //     console.log('5', this.details)
     //    })
     })

  	 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  ionOnInit(){

  }

  // hitungSaldo(){
  //   let pemasukan   = 0;
  //   let pengeluaran = 0;
  //   this.username = this.storage.get('username').then((user)=>{
  //      console.log(user)
  //      this.pemasukan   = this.af.database.list('/pemasukan/'+user);
  //      this.pengeluaran = this.af.database.list('/pengeluaran/'+user);


  //      // Hitung Total Pemasukan
  //       this.pemasukan.subscribe(snapshot => {
  //        snapshot.forEach(snapshot => {
  //          console.log('2',snapshot.jumlah)
  //          this.details.totalPemasukan += parseInt(snapshot.jumlah);
  //          this.details.countPemasukan += 1;
  //        })

  //        console.log('3', this.details)
  //       })

  //      // Hitung Total Pengeluaran
  //       this.pengeluaran.subscribe(snapshot => {
  //        snapshot.forEach(snapshot => {
  //          console.log('4',snapshot.jumlah)
  //          this.details.totalPengeluaran += parseInt(snapshot.jumlah);
  //          this.details.countPengeluaran += 1;
  //        })

  //        this.details.saldo = this.details.totalPemasukan - this.details.totalPengeluaran

  //        console.log('5', this.details)
  //       })
  //    })
  // }

  toFormPage(){
    this.navCtrl.push(FormPage)
  }

  removePemasukan(itemId, item){
    this.details.saldo -= item.jumlah;
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

