import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PickupServicePage } from './pickup-service';

@NgModule({
  declarations: [
    PickupServicePage,
  ],
  imports: [
    IonicPageModule.forChild(PickupServicePage),
  ],
})
export class PickupServicePageModule {}
