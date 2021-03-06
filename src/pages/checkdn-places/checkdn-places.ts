import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { Storage } from '../../../node_modules/@ionic/storage';
import { FirestoreProvider } from '../../providers/firestore/firestore';


@IonicPage()
@Component({
  selector: 'page-checkdn-places',
  templateUrl: 'checkdn-places.html',
})
export class CheckdnPlacesPage {

  constructor(
    private modal: ModalController,
    private fs: FirestoreProvider,
    private alert: AlertController,
    private ls: Storage,
    public navCtrl: NavController, 
    public navParams: NavParams) {
  }

  places;
  user;
  checkdn;
  
  async ionViewDidLoad() {
    this.user = await this.ls.get('user');
    this.places = this.user.checkdnPlaces;
    this.checkdn = this.user.checkdn;
    console.log(this.user)
  }

  changeCheckdn(place){
    this.fs.updateDocument("users", this.user.uid, {checkdn: place})
  }
  confirmChange(place){
    this.alert.create({
      title: "Change Checkdn",
      message: "Are you sure you want to change your checkdn?",
      buttons:[{
        text: "Cancel",
        role: "cancel"
      },{
        text: "Change Checkdn",
        handler: () =>{
          this.changeCheckdn(place);
          this.navCtrl.pop();
        }
      }]
    }).present()
  }

  addCheckdn(){
    this.modal.create("CreateCheckdnPage").present()
  }
}
