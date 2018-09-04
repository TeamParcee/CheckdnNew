import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
import { ToastProvider } from '../../providers/toast/toast';
import 'firebase/firestore';
import { FirestoreProvider } from '../../providers/firestore/firestore';
import { Storage } from '@ionic/storage';
import { LocationProvider } from '../../providers/location/location';
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(
    private location: LocationProvider,
    private ls: Storage,
    private fs: FirestoreProvider,
    private toast: ToastProvider,
    public navCtrl: NavController, 
    public navParams: NavParams) {
  }

  email;
  password;
  checkdnPlaces;

 async ionViewDidLoad() {
    this.checkdnPlaces = await this.location.getCheckdnPlaces();
    console.log(this.checkdnPlaces, "places")
  }


  login(){
    firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(async (fsUser)=>{
      this.fs.updateDocument("users", fsUser.uid, {checkdnPlaces: (this.checkdnPlaces) ? this.checkdnPlaces : [], checkdnPlace: "",});
      let user = await this.fs.getDocument("users", fsUser.uid);
      this.ls.set("user", user);
      this.navCtrl.setRoot("TabsPage");
    }).catch((e)=>{
      
      console.log(e.message)
    })
  }

  
}
