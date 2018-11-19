import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderDataPage } from './order-data';

@NgModule({
  declarations: [
    OrderDataPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderDataPage),
  ],
})
export class OrderDataPageModule {}
