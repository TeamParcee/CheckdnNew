import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { FirestoreProvider } from '../../providers/firestore/firestore';


@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {

  constructor(
    private toast: ToastController,
    private ls: Storage,
    private fs: FirestoreProvider,
    public navCtrl: NavController,
    public navParams: NavParams) {
  }


  async ionViewDidLoad() {
    this.user = await this.ls.get("user");

  }
  user;
  imageFile;
  save() {
    this.ls.set("user", this.user);
    this.fs.updateDocument("/users/", this.user.uid, this.user);
    this.toast.create({
      message: "Your profile has been save",
      position: "bottom",
      duration: 2500
    }).present()
  }

  getPictures(event) {
    let uploadedPic = event.target.files[0];
    let imageFile;
    imageFile = uploadedPic;
    let reader = new FileReader;
    let that = this;
    reader.onloadend =  function () {
      that.user.photoURL =   reader.result; 
    }
    reader.readAsDataURL(uploadedPic)
    this.imageFile = imageFile;
  }
}
