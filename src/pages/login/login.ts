import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
import { ToastProvider } from '../../providers/toast/toast';
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(
    private toast: ToastProvider,
    public navCtrl: NavController, 
    public navParams: NavParams) {
  }

  email;
  password;

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }


  create(){
    firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(()=>{
        this.navCtrl.pop();
    }).catch((e)=>{
      this.toast.show(e.message);
    })
  }
}
