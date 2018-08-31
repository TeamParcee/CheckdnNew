import {Component, ViewChild} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  Content,
} from 'ionic-angular';
import { FirestoreProvider } from '../../providers/firestore/firestore';
import { Storage } from '../../../node_modules/@ionic/storage';
import * as firebase from 'firebase';
import 'firebase/firestore';
import * as moment from 'moment';


@IonicPage()
@Component({
  selector: 'page-message',
  templateUrl: 'message.html',

})

export class MessagePage {
  @ViewChild(Content) content: Content;

  cards: any = [];
  text;
  user;
  today = Date.now();
  recipient;
  messages;
  time;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private fs: FirestoreProvider,
              private ls: Storage,
) {}

 

  async ionViewDidLoad() {
    await this.getRecipient();
    await this.getUser();
    await this.getMessages();
  }


 

  async getRecipient(){
    this.recipient = await this.navParams.get('recipient');
  }
  async getUser(){
    this.user = await this.ls.get("user");
  }

  getMessages(){
    let userRef = "messageboxes/" + this.user.uid + "/recipients/" + this.recipient.uid + "/messages/";
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

  async sendMessage(){
    let mid = await this.fs.createNewDocId("messageboxes");
    let timestamp = new Date;
    let recipentRefCol = "messageboxes/" + this.recipient.uid + "/recipients/" + this.user.uid + "/messages/";
   let userRefCol = "messageboxes/" + this.user.uid + "/recipients/" + this.recipient.uid + "/messages/";
   let recipentRefDoc = "messageboxes/" + this.recipient.uid + "/recipients/";
   let userRefDoc = "messageboxes/" + this.user.uid + "/recipients/";

    let message = {
     user: this.user,
     text: this.text,
     timestamp: timestamp,
     mid: mid
    }
  
   
 
   let lastMessageUser = {
     text: this.text,
     timestamp: timestamp,
     user: this.recipient,
     mid: mid
   } 
   let lastMessageRecipient = {
    text: this.text,
    new: true,
    timestamp: timestamp,
    user: this.user,
    mid: mid
  }
   this.fs.addToCollection(recipentRefCol, message);
   this.fs.addToCollection(userRefCol, message);
   this.fs.setDocument(recipentRefDoc, this.user.uid, lastMessageRecipient);
   this.fs.setDocument(userRefDoc, this.recipient.uid, lastMessageUser);

   this.text = "";
   let that = this;
   setTimeout(function(){
     that.content.scrollToBottom()
   }, 250)
   
  }

  back(){
    this.navCtrl.pop();
  }

  getCss(message) {
    if(message.user.uid == this.user.uid){
      return "mymsg"
    } else {
      return "othermsg";
    }
  }
    getOwner(message) {
      if(message.user.uid == this.user.uid){
        return "mymsgAlign"
      } else {
        return "othermsgAlign";
      }
}
changetextarea() {
  // get elements
  var element   = document.getElementById('messageInputBox');
  var textarea  = element.getElementsByTagName('textarea')[0];

  // set default style for textarea
  textarea.style.minHeight  = '50px';
  textarea.style.height     = '0';

  // limit size to 96 pixels (6 lines of text)
  var scroll_height = textarea.scrollHeight;
  if(scroll_height > 160)
    scroll_height = 160;

  // apply new style
  element.style.height      = scroll_height + "px";
  textarea.style.minHeight  = scroll_height + "px";
  textarea.style.height     = scroll_height + "px";
}
messagesHeaderFn(record) {
  if (moment(record.timestamp).fromNow() != this.time) {
    this.time = moment(record.timestamp).fromNow();
    console.log(this.time);
    return this.time
  }
  return null;
}
}
