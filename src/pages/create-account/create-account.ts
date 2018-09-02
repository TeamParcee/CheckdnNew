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
    firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then((user: firebase.User)=>{
      user.updateProfile({
        displayName: this.displayName,
        photoURL: "../../assets/imgs/photo_anonymous.png"
      }).then(()=>{
        this.toast.show("Account created successfully");
        this.navCtrl.pop()
      })
    }).catch((e)=>{
      this.toast.show(e.message);
    })
  }
}
