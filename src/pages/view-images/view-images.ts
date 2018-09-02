import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirestoreProvider } from '../../providers/firestore/firestore';


@IonicPage()
@Component({
  selector: 'page-view-images',
  templateUrl: 'view-images.html',
})
export class ViewImagesPage {

  constructor(
    private fs: FirestoreProvider,
    public navCtrl: NavController, 
    public navParams: NavParams) {

  }

  async ionViewDidLoad() {
    this.user = await this.navParams.get("user");
    this.getImages();
  }

  user;
  images;

  async getImages(){
    this.images = await this.fs.getCollection("users/" + this.user.uid + "/pics/");
    console.log(this.images)
  }
}
