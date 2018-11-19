import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MealInfoPage } from './meal-info';

@NgModule({
  declarations: [
    MealInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(MealInfoPage),
  ],
})
export class MealInfoPageModule {}
