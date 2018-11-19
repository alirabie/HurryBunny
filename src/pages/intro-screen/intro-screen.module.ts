import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IntroScreenPage } from './intro-screen';

@NgModule({
  declarations: [
    IntroScreenPage,
  ],
  imports: [
    IonicPageModule.forChild(IntroScreenPage),
  ],
})
export class IntroScreenPageModule {}
