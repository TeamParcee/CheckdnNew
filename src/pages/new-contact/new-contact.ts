import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { FirestoreProvider } from '../../providers/firestore/firestore';
import { Storage } from '@ionic/storage';
@IonicPage()
@Component({
  selector: 'page-new-contact',
  templateUrl: 'new-contact.html',
})
export class NewContactPage {

  constructor(
    private ls: Storage,
    private fs: FirestoreProvider,
    private alert: AlertController,
    public navCtrl: NavController, 
    public navParams: NavParams) {
  }

  user
  users;
  usersRef = firebase.firestore().collection("/users/");
  async ionViewDidLoad() {
    this.user = await this.ls.get("user");
    this.getAllUsers();
  }



  getAllUsers(){
    
    this.usersRef.onSnapshot((userSnap)=>{
      let users = [];
      userSnap.forEach((user)=>{
        users.push(user.data());
      })
      this.users = users;
      console.log(this.users)
    })
  }

 
  getItems(event) {
    let val = event.target.value;
    if (val) {
      
      this.users = this.users.filter((item: any) => {
        if (item.displayName.toLowerCase().indexOf(val.toLowerCase()) > -1) {
          return item;
        }
        console.log(false)
        return false;
      })
      console.log(this.users)
    } else {
      this.getAllUsers();
    }
  }
  confirmAddContact(user){
    this.alert.create({
      title: "Add Contact",
      message: "Are you sure you want to add " + user.displayName + " as a contact?",
      buttons: [{
        text: "Cancel",
        role: "cancel"
      },{
        text: "Add",
        handler: ()=>{
          this.addContact(user)
        }
      }]
    }).present()
  }
  addContact(user){
    this.fs.setDocument("/users/" + this.user.uid + "/contacts/", user.uid, {
        uid: user.uid,
        status: "pending approval",
    })
    this.fs.setDocument("/users/" + user.uid + "/contacts/", user.uid, {
      uid: this.user,
      status: "approval needed",
  })
  }
}
