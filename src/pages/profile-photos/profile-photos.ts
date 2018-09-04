import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { FirestoreProvider } from '../../providers/firestore/firestore';
import { LoadingProvider } from '../../providers/loading/loading';
import { Storage } from '@ionic/storage';
import { ImageResizerProvider } from '../../providers/image-resizer/image-resizer';
@IonicPage()
@Component({
  selector: 'page-profile-photos',
  templateUrl: 'profile-photos.html',
})
export class ProfilePhotosPage {

  constructor(
    private imageResizer: ImageResizerProvider,
    private alert: AlertController,
    private ls: Storage,
    private loading: LoadingController,
    private fs: FirestoreProvider,
    public navCtrl: NavController, 
    public navParams: NavParams) {
  }

  async ionViewDidLoad() {
    
    this.user = await this.ls.get("user")
    this.getUserPics(this.user);
  }

  user;
  uploadedPics;
  pics = [];
  imageFiles = [];
  userPics = [];

  
  getUserPics(user){
    firebase.firestore().collection("users/" + user.uid + "/pics").onSnapshot((picSnap)=>{
      let pics = [];
      picSnap.forEach((pic)=>{
        pics.push(pic.data())
      })
      this.userPics = pics;
    })
  }
  getPictures(event){
    let uploadedPics = event.target.files;
    let pics = [];
    let imageFiles = [];
    let that = this;
    for (var i = 0; i < uploadedPics.length; i++) {
      imageFiles.push(uploadedPics[i]);
      let reader = new FileReader;
      reader.onloadend = function () {
      // pics.push(reader.result)
        that.imageResizer.resize(reader.result);
    }
    // reader.readAsDataURL(uploadedPics[i])
  }
  this.pics = pics;
  this.imageFiles = imageFiles;
  }
  async uploadPics(){
    let loading = this.loading.create();
    loading.present().then(async ()=>{
      for (var i = 0; i < this.imageFiles.length; i++) {
        let picId = await this.fs.createNewDocId("/users/" + this.user.uid + "/pics/");
        firebase.storage().ref("/users/" + this.user.uid + "/pics/" + picId + ".png").put(this.imageFiles[i])
        .then(async (snapShot)=>{
          let url = await snapShot.ref.getDownloadURL();
          await this.fs.setDocument("/users/" + this.user.uid + "/pics/", picId, {downloadURL: url, picId: picId})
        }).then(()=>{
          this.pics = [];
        loading.dismiss()
        })
  
        
      }
    })
    
   
  }

  confirmDelete(picId){
    this.alert.create({
      title: "Are you sure you want to delete this picture?",
      buttons: [{
        text: "Cancel",
        role: "cancel"
      },{
        text: "Delete",
        role: "destructive",
        handler: ()=>{
          this.delete(picId);

        }
      }]
    }).present()
  }
  delete(picId){
    this.fs.deleteDocument("/users/" + this.user.uid + "/pics/", picId);
  }
}
