import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CheckdnChatPage } from './checkdn-chat';

@NgModule({
  declarations: [
    CheckdnChatPage,
  ],
  imports: [
    IonicPageModule.forChild(CheckdnChatPage),
  ],
})
export class CheckdnChatPageModule {}
