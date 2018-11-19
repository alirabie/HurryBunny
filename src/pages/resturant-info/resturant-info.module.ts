import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ResturantInfoPage } from './resturant-info';
import { SuperTabsModule } from 'ionic2-super-tabs';
import { IonicImageLoader } from 'ionic-image-loader';

@NgModule({
  declarations: [
    ResturantInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(ResturantInfoPage),
    SuperTabsModule,
    IonicImageLoader
  ],
})
export class ResturantInfoPageModule {}
