import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';


@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  constructor(
    private auth: AuthProvider,
    private actionSheetCtrl: ActionSheetController,
    public navCtrl: NavController, 
    public navParams: NavParams) {
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

  logOut(){
    this.actionSheetCtrl.create({
      title: "Are you sure you want to log out?",
      buttons: [{
        text: "Log Out",
        role: "destructive",
        handler: () =>{
          this.auth.signout().then(()=>{
            this.navCtrl.parent.parent.setRoot("WelcomePage")
          })
        }
      }, {
        text: "Cancel",
        role: "cancel",
      }]
    }).present()
  }
}
