import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { ToastController } from '../../../node_modules/ionic-angular';
import { Storage } from '../../../node_modules/@ionic/storage';

@Injectable()
export class AuthProvider {

  constructor(
    private ls: Storage,
    private toast: ToastController,
  ) {
    console.log('Hello AuthProvider Provider');
  }


  auth = firebase.auth();
  loginWithFB(){
    let provider = new firebase.auth.FacebookAuthProvider();
    this.auth.signInWithRedirect(provider)
  }
  getFbRedirectResults(){
    return new Promise((resolve)=>{
      return this.auth.getRedirectResult().then((results)=>{
        if(results){
          return resolve(results.user)
        }
      })
    })
  }

  signout(){
    return new Promise((resolve)=>{
      this.auth.signOut().then(()=>{
        this.ls.remove("user");
      })
      return resolve()
    })
  
  }
}
