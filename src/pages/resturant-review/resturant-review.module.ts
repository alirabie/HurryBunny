import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ResturantReviewPage } from './resturant-review';

@NgModule({
  declarations: [
    ResturantReviewPage,
  ],
  imports: [
    IonicPageModule.forChild(ResturantReviewPage),
  ],
})
export class ResturantReviewPageModule {}
