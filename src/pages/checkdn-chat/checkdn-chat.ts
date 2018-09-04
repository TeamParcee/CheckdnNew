import { FirestoreProvider } from './../../providers/firestore/firestore';
import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,  } from 'ionic-angular';
import * as firebase from 'firebase';
import 'firebase/firestore';


@IonicPage()
@Component({
  selector: 'page-checkdn-chat',
  templateUrl: 'checkdn-chat.html',
})
export class CheckdnChatPage {

  constructor(
    private ls: Storage,
    private fs: FirestoreProvider,
    public navCtrl: NavController,
    public navParams: NavParams) {
  }

  notCheckdn;
  user;
  users;
  feed;
  message;
  showFooter;
  newItemCount;
  async ionViewDidLoad() {
    this.user = await this.getUser();
    this.checkHasAccount();
  }





  async getUser() {
    let user = await this.ls.get("user");
    if (!user) {
      this.navCtrl.setRoot("WelcomePage")
    } else {
      return user
    }
  }

  async checkHasAccount() {
    if (this.user) {
      let exist = await this.fs.checkDocExists("users", this.user.uid);
      if (!exist) {
        this.navCtrl.setRoot("WelcomePage")
      } else {
        this.watchCheckdn();
      }
    } else {
      this.navCtrl.setRoot("WelcomePage")
    }

  }

  async watchCheckdn() {
    firebase.firestore().doc("users/" + this.user.uid).onSnapshot((userSnap) => {
      this.updateCheckdnLocation()
    })
  }

  async updateCheckdnLocation() {
    let fsUser = await this.fs.getDocument("users", this.user.uid);
    this.user.checkdn = fsUser.checkdn;
    if (this.user.checkdn) {
      this.getFeed();
      this.getUsers();
    } else {
      this.notCheckdn = true;
    }


  }

  async getFeed() {

    // get the placeid of the checkdn place
    let placeid = this.user.checkdn.placeid;

    firebase.firestore().collection("/feeds/" + placeid + "/feed/")
      .limit(20)
      .orderBy("timestamp", "desc")
      .onSnapshot((postSnap) => {
        let posts = [];
        postSnap.forEach((post) => {
          posts.push(post.data())
        })
        this.feed = posts;
      })
  }

  async getUsers() {
    firebase.firestore().collection("/users/")
      .where("checkdn.placeid", "==", this.user.checkdn.placeid)
      .onSnapshot((userSnap) => {
        let users = [];
        userSnap.forEach((user) => {
          users.push(user.data())
        })
        this.users = users;
      })
  }

  post() {
    let now = new Date();
    let feedRef = "/feeds/" + this.user.checkdn.placeid + "/feed/";
    let post = {
      user: this.user,
      message: this.message,
      timestamp: now,
      pid: ''
    }
    firebase.firestore().collection(feedRef).add(post).then((result) => {
      result.update({ pid: result.id })
    })
    this.message = null;
  }
  checkdnUsersPage() {
    this.navCtrl.push("CheckdnUsersPage", { users: this.users })
  }
  changeCheckdnPage() {
    this.navCtrl.push("CheckdnPlacesPage", { places: this.user.checkdnPlaces, checkdn: this.user.checkdn })
  }

  changetextarea() {
    // get elements
    var element = document.getElementById('messageInputBox');
    var textarea = element.getElementsByTagName('textarea')[0];

    // set default style for textarea
    textarea.style.minHeight = '50px';
    textarea.style.height = '0';

    // limit size to 96 pixels (6 lines of text)
    var scroll_height = textarea.scrollHeight;
    if (scroll_height > 160)
      scroll_height = 160;

    // apply new style
    element.style.height = scroll_height + "px";
    textarea.style.minHeight = scroll_height + "px";
    textarea.style.height = scroll_height + "px";
  }


  messageListPage() {
    this.navCtrl.push("MessageListPage")
  }
  messagePage(recipient) {
    this.navCtrl.push('MessagePage', { recipient: recipient });
  }
}
