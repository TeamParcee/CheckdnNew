import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirestoreProvider } from '../../providers/firestore/firestore';
import * as firebase from 'firebase';
import 'firebase/firestore';

@IonicPage()
@Component({
  selector: 'page-view-profile',
  templateUrl: 'view-profile.html',
})
export class ViewProfilePage {

  constructor(
    private fs: FirestoreProvider,
    public navCtrl: NavController, 
    public navParams: NavParams) {
  }

  profileUser;
  pics;

  async ionViewDidLoad() {
    console.log('ionViewDidLoad ViewProfilePage');
    this.profileUser = await this.navParams.get("user");
    await this.getFirestoreUser(this.profileUser.uid);
    await this.getPics(this.profileUser.uid)
  }
  
  async getFirestoreUser(uid){
    this.profileUser = await this.fs.getDocument("users", uid);
  }
  async getPics(uid){
    firebase.firestore().collection("users/" + uid + "/pics").get().then((picSnap)=>{
      let pics = [];
      picSnap.forEach((pic)=>{
        pics.push(pic.data())
      })
      this.pics = pics;
      console.log(this.pics);
    })
  }
  messagePage() {
    this.navCtrl.push('MessagePage', {recipient: this.profileUser});
  }
  viewImagesPage(){
    this.navCtrl.push('ViewImagesPage', {user: this.profileUser});
  }
}
