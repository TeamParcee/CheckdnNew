import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirestoreProvider } from '../../providers/firestore/firestore';
import { LocationProvider } from '../../providers/location/location';



@IonicPage()
@Component({
  selector: 'page-create-checkdn',
  templateUrl: 'create-checkdn.html',
})
export class CreateCheckdnPage {

  constructor(
    private location: LocationProvider,
    private fs: FirestoreProvider,
    public navCtrl: NavController, 
    public navParams: NavParams) {
  }

  currentLocation = true;
  address;
  latlng;
  name;
  placeid;
  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateCheckdnPage');
  }

  async add(){
    let latlng = await this.getlatlng(this.address);
    console.log(latlng);
  }
  async getlatlng(address){
    return await this.location.geocodeAddress(address)
  }
}
