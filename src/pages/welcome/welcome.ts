import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { AuthProvider } from '../../providers/auth/auth';
import { FirestoreProvider } from '../../providers/firestore/firestore';
import { Storage } from '@ionic/storage';
import { LocationProvider } from '../../providers/location/location';
import { LoadingProvider } from '../../providers/loading/loading';

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})

export class WelcomePage {

  constructor(
    private loading: LoadingProvider,
    private location: LocationProvider,
    private ls: Storage,
    private fs: FirestoreProvider,
    private auth: AuthProvider,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public navParams: NavParams) {
  }

  user;
  allPlaces;
  checkdnPlaces;

  async ionViewDidLoad() {
    this.loading.show();
    this.allPlaces = await this.fs.getCollection("checkPlaces");
    this.checkdnPlaces = await this.getCheckdnPlaces();

    firebase.auth().onAuthStateChanged(async (user_auth) => {
      if (user_auth) {
        let user: any = await this.getFireStoreUser(user_auth);
        this.ls.set("user", user);
        if (!user.displayName || !user.email || !user.gender || !user.relationship || !user.photoURL) {
          this.loading.hide();
          this.navCtrl.setRoot("CompleteProfilePage")
        }
        else {
          this.loading.hide();
          this.navCtrl.setRoot("TabsPage")
        }
      }
    })
    this.loading.hide()
  }


  getFireStoreUser(fire_user) {
    return new Promise(async (resolve) => {
      let userExists = await this.fs.checkDocExists("users", fire_user.uid);
      let user;
      // if user is not there create user
      if (!userExists) {
        //set default user fields
        user = {
          displayName: fire_user.displayName,
          email: fire_user.email,
          gender: "",
          photoURL: "../../assets/imgs/photo_anonymous.png",
          phoneNumber: fire_user.phoneNumber,
          pics: [],
          relationship: "",
          uid: fire_user.uid,
          checkdnPlaces: this.checkdnPlaces,
          checkdn: this.checkdnPlaces[0],
          online: true,
          contacts: []
        }
        this.fs.setDocument("users", fire_user.uid, user)
      } else {
        let update = {
          checkdnPlaces: this.checkdnPlaces,
          checkdn: this.checkdnPlaces[0]
        }
        this.fs.updateDocument("users/", fire_user.uid, update);
        user = await this.fs.getDocument("users", fire_user.uid);
      }
      return resolve(user)
    })

  }
  facebookLogin() {
    this.auth.loginWithFB();
  }

  async getCheckdnPlaces() {
    return new Promise(async (resolve) => {
      let checkdnPlaces = await this.location.getDistanceMatrix(this.allPlaces);
      return resolve(checkdnPlaces);
    })
  }

}
