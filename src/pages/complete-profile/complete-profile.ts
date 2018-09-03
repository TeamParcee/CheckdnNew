import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { FirestoreProvider } from '../../providers/firestore/firestore';

@IonicPage()
@Component({
  selector: 'page-complete-profile',
  templateUrl: 'complete-profile.html',
})
export class CompleteProfilePage {

  constructor(
    private fs: FirestoreProvider,
    private ls: Storage,
    public navCtrl: NavController, 
    public navParams: NavParams) {
  }

  async ionViewDidLoad() {
    console.log('ionViewDidLoad CompleteProfilePage');
    this.user = await this.ls.get("user");
  }

  user;
  imageFile;
  save(){
    this.ls.set("user", this.user);
    this.fs.updateDocument("users", this.user.uid, this.user);
    this.navCtrl.setRoot("TabsPage")
  }

  private previewPic(event){
    let imageFile = event.target.files[0];
    
    let reader = new FileReader();
    let that = this;
    reader.onloadend = function () {
      that.user.photoURL = reader.result;
    }
    this.imageFile = imageFile;
    if (imageFile) {
      reader.readAsDataURL(imageFile);
    }
  }
  
}
 