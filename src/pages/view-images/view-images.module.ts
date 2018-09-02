import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewImagesPage } from './view-images';
import { IonicImageViewerModule } from 'ionic-img-viewer';

@NgModule({
  declarations: [
    ViewImagesPage,
  ],
  imports: [
    IonicPageModule.forChild(ViewImagesPage),
    IonicImageViewerModule
  ],
})
export class ViewImagesPageModule {}
