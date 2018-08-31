import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { AuthProvider } from '../../providers/auth/auth';
import { FirestoreProvider } from '../../providers/firestore/firestore';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  constructor(
    private ls: Storage,
    private fs: FirestoreProvider,
    private auth: AuthProvider,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController, 
    public navParams: NavParams) {
  }

  user;
  async ionViewDidLoad() {
    firebase.auth().onAuthStateChanged(async (user_auth)=>{
      if(user_auth){
        let user:any = await this.getFireStoreUser(user_auth);
        this.ls.set("user", user);
        if (!user.displayName || !user.email || !user.gender || !user.relationship || !user.photoURL) {
          this.navCtrl.setRoot("CompleteProfilePage") }
          else {
            this.navCtrl.setRoot("TabsPage")
          } 
      }
    })
  }


  getFireStoreUser(fire_user){
    return new Promise(async(resolve)=>{
      let userExists = await this.fs.checkDocExists("users", fire_user.uid);
      let user;
      // if user is not there create user
      if(!userExists) {
        //set default user fields
        user = {
        displayName: fire_user.displayName,
        email: fire_user.email,
        gender: "",
        photoURL:"../../assets/imgs/photo_anonymous.png",
        phoneNumber: fire_user.phoneNumber,
        pics: [],
        relationship: "",
        uid: fire_user.uid,
        checkdn: "",
        checkdLocation: [],
        contacts: []
        }
        this.fs.setDocument("users", fire_user.uid, user)
      } else {
        user = await this.fs.getDocument("users", fire_user.uid);
      }
      return resolve(user)
    })
    
  }
  facebookLogin(){
    this.auth.loginWithFB(); 
  }
}
