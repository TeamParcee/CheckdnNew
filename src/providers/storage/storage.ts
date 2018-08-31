import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable()
export class StorageProvider {

  constructor(

  ) {
    console.log('Hello StorageProvider Provider');
  }

  private storage = firebase.storage();
  private storageRef = this.storage.ref();

  public async uploadFileBlob(path:string, blob: any){
    let file = await this.storageRef.child(path).put(blob);
    return file.downloadURL;
    // console.log(blob, path);
  } 
  public async uploadFileString(path:string, file:string){
    return await this.storageRef.child(path).putString(file);
  }
  public async deleteFile(path:string){ 
    return await this.storageRef.child(path).delete();
  }
}
