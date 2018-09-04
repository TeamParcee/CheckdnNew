import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-loader',
  templateUrl: 'loader.html',
})
export class LoaderPage {

  constructor(
    private ls: Storage,
    public navCtrl: NavController, 
    public navParams: NavParams) {
  }

  async ionViewDidLoad() {
    let user = await this.ls.get("user");
    if(user){
      this.navCtrl.setRoot("TabsPage");
    } else {
      this.navCtrl.setRoot("WelcomePage")
    }
  }

}
