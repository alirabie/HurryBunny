import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MealsReviewsPage } from './meals-reviews';

@NgModule({
  declarations: [
    MealsReviewsPage,
  ],
  imports: [
    IonicPageModule.forChild(MealsReviewsPage),
  ],
})
export class MealsReviewsPageModule {}
