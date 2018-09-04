import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateCheckdnPage } from './create-checkdn';

@NgModule({
  declarations: [
    CreateCheckdnPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateCheckdnPage),
  ],
})
export class CreateCheckdnPageModule {}
