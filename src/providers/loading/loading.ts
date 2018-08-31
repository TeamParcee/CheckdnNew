import { Injectable } from '@angular/core';
import { LoadingController, Loading } from '../../../node_modules/ionic-angular';


@Injectable()
export class LoadingProvider {

  constructor(private loadingCtrl: LoadingController) {
    console.log('Hello LoadingProvider Provider');
  }

  loading: Loading;

  show(){
    this.loading = this.loadingCtrl.create();
    this.loading.present()
  }
  hide(){
    this.loading.dismiss()
  }
}
