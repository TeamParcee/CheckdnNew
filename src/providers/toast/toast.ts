import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';


@Injectable()
export class ToastProvider {

  constructor(
    private toast: ToastController,
  ) {
    console.log('Hello ToastProvider Provider');
  }

  public show(message:string){
    this.toast.create({
      message: message,
      duration: 2500,
      position: "bottom"
    }).present()
  }
}
