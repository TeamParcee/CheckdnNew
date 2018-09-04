import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  constructor(
    private ls: Storage,
    public navCtrl: NavController, 
    public navParams: NavParams) {
  }

  newCount;
  user;
  async ionViewDidLoad() {
    this.user = await this.ls.get("user");
    this.getMessages()
  }


  getMessages(){
    let userRef =  "messageboxes/" + this.user.uid + "/recipients/";
     firebase.firestore().collection(userRef)
     .where("new", "==", true)
      .onSnapshot((messageSnap)=>{
        this.newCount = messageSnap.size
     })
     
   }
}
