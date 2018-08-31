import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfilePhotosPage } from './profile-photos';
import { IonicImageViewerModule } from 'ionic-img-viewer';

@NgModule({
  declarations: [
    ProfilePhotosPage,
  ],
  imports: [
    IonicPageModule.forChild(ProfilePhotosPage),
    IonicImageViewerModule
  ],
})
export class ProfilePhotosPageModule {}
