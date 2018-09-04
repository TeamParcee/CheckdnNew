import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule,  } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { FirestoreProvider } from '../providers/firestore/firestore';
import { DatabaseProvider } from '../providers/database/database';
import * as firebase from 'firebase';
import { AuthProvider } from '../providers/auth/auth';
import { LoadingProvider } from '../providers/loading/loading';
import { IonicStorageModule } from '@ionic/storage';
import { LocationProvider } from '../providers/location/location';
import { StorageProvider } from '../providers/storage/storage';
import { ToastProvider } from '../providers/toast/toast';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { Facebook } from '@ionic-native/facebook';
import { SuperTabsModule } from 'ionic2-super-tabs';
import { SuperTabsController } from 'ionic2-super-tabs';
//cordova 
import { ImagePicker } from '@ionic-native/image-picker';
import { ImageResizerProvider } from '../providers/image-resizer/image-resizer';
import { ImageResizer } from '@ionic-native/image-resizer';
import { InAppBrowser } from '@ionic-native/in-app-browser';



  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyA0cr5s_hTaHgCrxQz4O3zutU1Mcq-uSZA",
    authDomain: "checkdn-914.firebaseapp.com",
    databaseURL: "https://checkdn-914.firebaseio.com",
    projectId: "checkdn-914",
    storageBucket: "checkdn-914.appspot.com",
    messagingSenderId: "118221588888"
  };
  firebase.initializeApp(config);
  
@NgModule({
  declarations: [
    MyApp,

    

  ],
  imports: [
    BrowserModule,
    IonicImageViewerModule,
    SuperTabsModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp, {
      // mode: "ios"
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    FirestoreProvider,
    DatabaseProvider,
    LoadingProvider,
    StorageProvider,
    ToastProvider,
    ImagePicker,
    SuperTabsController,
    SuperTabsModule,
    LocationProvider,
    Facebook,
    ImageResizer,
    ImageResizerProvider,
    InAppBrowser,
  ]
})
export class AppModule {}
