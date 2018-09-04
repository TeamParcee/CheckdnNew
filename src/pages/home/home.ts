import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { LoadingProvider } from '../../providers/loading/loading';
import { Storage } from '@ionic/storage';
import { FirestoreProvider } from '../../providers/firestore/firestore';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(
    private fs: FirestoreProvider,
    private ls: Storage,
    private loading: LoadingProvider,
    public navCtrl: NavController, 
    public navParams: NavParams) {
  }

  async ionViewDidLoad() {
    this.user = await this.ls.get("user");
    this.checkHasAccount();
  }

user;
users;

chatRoomPage(){
  this.navCtrl.parent.parent.push("ChatRoomPage")
}
profilePage(){
  this.navCtrl.parent.parent.push("ProfilePage")
}
getUsers(){
  this.loading.show();
  firebase.firestore().collection("/users/")
  .where("checkdn.placeid", "==", this.user.checkdn.placeid)
  .onSnapshot((userSnap)=>{
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

changeCheckdnPage(){
  this.navCtrl.push("CheckdnPlacesPage", {places: this.user.checkdnPlaces, checkdn: this.user.checkdn})
}
checkdnChatPage(){
  this.navCtrl.parent.parent.push("CheckdnChatPage")
}
async checkHasAccount(){
  if(this.user){
    let exist = await this.fs.checkDocExists("users", this.user.uid);
    if(!exist){
      this.navCtrl.setRoot("WelcomePage")
    } else {
      this.watchCheckdn();
    }
  } else {
    this.navCtrl.setRoot("WelcomePage")
  }
}
async watchCheckdn(){
  firebase.firestore().doc("users/" + this.user.uid).onSnapshot((userSnap)=>{
    this.updateCheckdnLocation()
  })
}

async updateCheckdnLocation(){
  let fsUser = await this.fs.getDocument("users", this.user.uid);
  this.user.checkdn = fsUser.checkdn;

  if(this.user.checkdn){
    this.getUsers();
  }
    

  }
}
