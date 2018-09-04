import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
import { ToastProvider } from '../../providers/toast/toast';
import { FirestoreProvider } from '../../providers/firestore/firestore';
import { LoadingProvider } from '../../providers/loading/loading';
import { LocationProvider } from '../../providers/location/location';


@IonicPage()
@Component({
  selector: 'page-create-account',
  templateUrl: 'create-account.html',
})
export class CreateAccountPage {

  constructor(
    private location: LocationProvider,
    private loading: LoadingProvider,
    private fs: FirestoreProvider,
    private ls: Storage,
    private toast: ToastProvider,
    public navCtrl: NavController, 
    public navParams: NavParams) {
  }

  displayName;
  email;
  password;
  checkdnPlaces;
  allPlaces;

  async ionViewDidLoad() {
    
  }
  async create(){
    this.loading.show();
    this.checkdnPlaces = await this.getCheckdnPlaces();
  
    firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then((fire_user: firebase.User)=>{
      fire_user.updateProfile({displayName: this.displayName, photoURL: "../../assets/imgs/photo_anonymous.png"})
    .then(()=>{
      let user = {
        displayName: this.displayName,
        email: this.email,
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
      this.fs.setDocument("users", fire_user.uid, user);
      this.ls.set("user", user)
      this.loading.hide();
      this.toast.show("Please finish creating your account");
      this.navCtrl.setRoot("CompleteProfilePage");
        
    })
  }).catch((e)=>{
    this.loading.hide();
    this.toast.show(e.message);
  })
}

async getCheckdnPlaces() {
  return new Promise(async (resolve) => {
    let checkdnPlaces = await this.location.getDistanceMatrix(this.allPlaces);
    return resolve(checkdnPlaces);

    
  })
}
}
