import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
import { ToastProvider } from '../../providers/toast/toast';
import 'firebase/firestore';
import { FirestoreProvider } from '../../providers/firestore/firestore';
import { Storage } from '@ionic/storage';
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(
    private ls: Storage,
    private fs: FirestoreProvider,
    private toast: ToastProvider,
    public navCtrl: NavController, 
    public navParams: NavParams) {
  }

  email;
  password;

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }


  login(){
    firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(async (fsUser)=>{
      let user = await this.fs.getDocument("users", fsUser.uid);
      this.ls.set("user", user);
      this.navCtrl.setRoot("TabsPage");
    }).catch((e)=>{
      this.toast.show(e.message);
    })
  }
}
