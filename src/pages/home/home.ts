import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { LoadingProvider } from '../../providers/loading/loading';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(
    private loading: LoadingProvider,
    public navCtrl: NavController, 
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    this.getUsers()
  }
users;

chatRoomPage(){
  this.navCtrl.parent.parent.push("ChatRoomPage")
}
profilePage(){
  this.navCtrl.parent.parent.push("ProfilePage")
}
getUsers(){
  this.loading.show();
  firebase.firestore().collection("/users/").onSnapshot((userSnap)=>{
    let users = [];
    userSnap.forEach((user)=>{
      users.push(user.data())
    })
    this.users = users;
    this.loading.hide()
  })
}

viewProfilePage(user){
  this.navCtrl.parent.parent.push("ViewProfilePage", {user: user})
}
}
