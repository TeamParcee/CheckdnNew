import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CheckdnLocationsPage } from './checkdn-locations';

@NgModule({
  declarations: [
    CheckdnLocationsPage,
  ],
  imports: [
    IonicPageModule.forChild(CheckdnLocationsPage),
  ],
})
export class CheckdnLocationsPageModule {}
