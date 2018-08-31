import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable()
export class DatabaseProvider {

  constructor() {
    console.log('Hello DatabaseProvider Provider');
  }

  db = firebase.database();
  // deletes the anonymous user after log off
  deleteAnonymousUser(uid){
          let dbRef = "/users/delete/" + uid;
        firebase.database().ref(dbRef).set({online: "yes"});
        firebase.database().ref(dbRef)
        .onDisconnect().remove();
  }

  // removes the checkdn after the user leaves the app;
  removeCheckdnOnLogOff(uid){
  let dbRef = "/users/removeCheckdn/" + uid;
  firebase.database().ref(dbRef).set({online: "yes"});
  firebase.database().ref(dbRef)
  .onDisconnect().remove();
}
}
