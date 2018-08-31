import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, } from 'ionic-angular';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { Storage } from '../../../node_modules/@ionic/storage';
import { FirestoreProvider } from '../../providers/firestore/firestore';


@IonicPage()
@Component({
  selector: 'page-message-list',
  templateUrl: 'message-list.html',
})
export class MessageListPage {



  constructor(
    private fs: FirestoreProvider,
    private ls: Storage,
    public navCtrl: NavController, 
    private navParams: NavParams,
) {
  }

  today = Date.now();
  user;
  messages;
  checkdn;
  users;
  async ionViewDidLoad() {
    await this.getUser();
    await this.getMessages();
  }



  messagePage(recipient, mid) {
    this.fs.updateDocument("messageboxes/" + this.user.uid + "/recipients/", mid, {new: false} );
    this.navCtrl.parent.parent.push('MessagePage', {recipient: recipient});
  }

 
  async getUser(){
    this.user = await this.ls.get("user");
  }
  getMessages(){
    let userRef =  "messageboxes/" + this.user.uid + "/recipients/";
     firebase.firestore().collection(userRef)
      .orderBy("timestamp")
      .onSnapshot((messageSnap)=>{
        let messages = [];
        messageSnap.forEach((message)=>{
        messages.push(message.data());
      })
      this.messages = messages;
     })
     
   }

  delete(message){
    this.fs.deleteDocument("messageboxes/" + this.user.uid + "/recipients/", message.user.uid);
  }

 
}
