import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompleteProfilePage } from './complete-profile';
import { IonicImageViewerModule } from 'ionic-img-viewer';

@NgModule({
  declarations: [
    CompleteProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(CompleteProfilePage),
    IonicImageViewerModule
  ],
})
export class CompleteProfilePageModule {}
