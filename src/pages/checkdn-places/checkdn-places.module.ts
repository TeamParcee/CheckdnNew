import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CheckdnPlacesPage } from './checkdn-places';

@NgModule({
  declarations: [
    CheckdnPlacesPage,
  ],
  imports: [
    IonicPageModule.forChild(CheckdnPlacesPage),
  ],
})
export class CheckdnPlacesPageModule {}
