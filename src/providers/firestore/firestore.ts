import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Storage } from '../../../node_modules/@ionic/storage';

@Injectable()
export class FirestoreProvider {

  constructor(
  ) {
    console.log('Hello FirestoreProvider Provider');
  }


  fs = firebase.firestore();

  checkDocExists(col, doc){
    return new Promise((resolve)=>{
      this.fs.collection(col).doc(doc).get().then((obj)=>{
        if(obj.exists){
          return resolve(true)
        }else {
          return resolve(false)
        }
      })
    })
    
  }
  updateDocument(col, doc, obj){
    this.fs.collection(col).doc(doc).update(obj).catch((e)=>{
      console.log(e.message)
    })
  }
  setDocument(col, doc, obj){
    this.fs.collection(col).doc(doc).set(obj).catch((e)=>{
      console.log(e.message)
    })
  }
  addToCollection(col, obj){
    this.fs.collection(col).add(obj).catch((e)=>{
      console.log(e.message)
    })
  }
  async createNewDocId(col){
    let id = await this.fs.collection(col).doc().id;
    return id;
  }
  async getDocument(col, doc){
    let obj = await this.fs.collection(col).doc(doc).get();
    return obj.data();
  }
  async getCollection(col){
    return new Promise((resolve)=>{
      
      this.fs.collection(col).get().then((objSnap)=>{
        let objs = [];
        objSnap.forEach((obj)=>{
          objs.push(obj.data())
        })
        return resolve(objs)
      })
    })
  }
  deleteDocument(col, doc){
    this.fs.collection(col).doc(doc).delete()
  }
}
