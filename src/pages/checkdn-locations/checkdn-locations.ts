import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-checkdn-locations',
  templateUrl: 'checkdn-locations.html',
})
export class CheckdnLocationsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.options = "close"
  }
options;

chatRoomPage(){
  this.navCtrl.parent.parent.push("ChatRoomPage")
}
}
