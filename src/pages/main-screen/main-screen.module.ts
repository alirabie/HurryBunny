import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MainScreenPage } from './main-screen';
import { IonicImageLoader } from 'ionic-image-loader';

@NgModule({
  declarations: [
    MainScreenPage,
  ],
  imports: [
    IonicPageModule.forChild(MainScreenPage),
    IonicImageLoader
  ],
})
export class MainScreenPageModule {}
