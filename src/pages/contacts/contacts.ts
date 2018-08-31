import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { Storage } from '@ionic/storage';
import { FirestoreProvider } from '../../providers/firestore/firestore';

@IonicPage()
@Component({
  selector: 'page-contacts',
  templateUrl: 'contacts.html',
})
export class ContactsPage {

  constructor(
    private fs: FirestoreProvider,
    private ls: Storage,
    public modalCtrl: ModalController,
    public navCtrl: NavController, 
    public navParams: NavParams) {
  }

  async ionViewDidLoad() {
    this.user = await this.ls.get("user");
    this.getPendingContacts();
    this.getContacts();
    this.getWaitingApproval();
  }

  user;
  contacts = [];
  oldLetter;
  pendingContacts = [];
  waitingApproval = [];

  getPendingContacts(){
    firebase.firestore().collection("/users/" + this.user.uid + "/contacts/")
    .where("status", "==", "pending approval")
    .onSnapshot((contactSnap)=>{
      let contacts = [];
      contactSnap.forEach((contact)=>{
        contacts.push(contact.data())
      })
      this.pendingContacts = contacts;
    })
  }
  getWaitingApproval(){
    firebase.firestore().collection("/users/" + this.user.uid + "/contacts/")
    .where("status", "==", "approval needed")
    .onSnapshot((contactSnap)=>{
      let contacts = [];
      contactSnap.forEach((contact)=>{
        contacts.push(contact.data())
      })
      this.waitingApproval = contacts;
    })
  }
  getContacts(){
    firebase.firestore().collection("/users/" + this.user.uid + "/contacts/")
    .where("status", "==", "contacts")
    .onSnapshot((contactSnap)=>{
      let contacts = [];
      contactSnap.forEach((contact)=>{
        contacts.push(contact.data())
      })
      this.contacts = contacts;
    })
  }
  newContact(){
    this.modalCtrl.create("NewContactPage").present();
  }
  contactHeaderFn(record:string, records) {
    if (record[0].toLowerCase() != this.oldLetter) {
      this.oldLetter = record[0].toLowerCase();
      return record[0].toUpperCase()
    }
    return null;
  }
}
