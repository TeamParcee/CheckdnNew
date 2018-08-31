import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { FirestoreProvider } from '../../providers/firestore/firestore';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { AuthProvider } from '../../providers/auth/auth';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  constructor(
    private auth: AuthProvider,
    private actionSheetCtrl: ActionSheetController,
    private ls: Storage,
    private fs: FirestoreProvider,
    public navCtrl: NavController, 
    public navParams: NavParams) {
  }

  user;
  pics;
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    this.getUser();
  }

  async getUser(){
    this.user = await this.ls.get("user");
    this.getImages();
  }
  async getImages(){
    firebase.firestore().collection("/users/" + this.user.uid + "/pics/").onSnapshot((picSnap)=>{
      this.pics = picSnap.size;
    })
  }

  logOut(){
    this.actionSheetCtrl.create({
      title: "Are you sure you want to log out?",
      buttons: [{
        text: "Log Out",
        role: "destructive",
        handler: () =>{
          this.auth.signout().then(()=>{
            this.navCtrl.parent.parent.setRoot("WelcomePage")
          })
        }
      }, {
        text: "Cancel",
        role: "cancel",
      }]
    }).present()
  }

  profilePhotosPage(){
    this.navCtrl.parent.parent.push("ProfilePhotosPage")
  }
  settingsPage(){
    this.navCtrl.parent.parent.push("SettingsPage")
  }
  editProfilePage(){
    this.navCtrl.parent.parent.push("EditProfilePage")
  }
}
