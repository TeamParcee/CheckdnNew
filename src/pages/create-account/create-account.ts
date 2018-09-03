import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
import { ToastProvider } from '../../providers/toast/toast';


@IonicPage()
@Component({
  selector: 'page-create-account',
  templateUrl: 'create-account.html',
})
export class CreateAccountPage {

  constructor(
    private ls: Storage,
    private toast: ToastProvider,
    public navCtrl: NavController, 
    public navParams: NavParams) {
  }

  displayName;
  email;
  password;

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateAccountPage');
  }

  create(){
    firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(()=>{
        this.toast.show("Account created successfully");
    }).catch((e)=>{
      this.toast.show(e.message);
    })
  }
}
