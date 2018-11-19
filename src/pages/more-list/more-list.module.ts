import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MoreListPage } from './more-list';

@NgModule({
  declarations: [
    MoreListPage,
  ],
  imports: [
    IonicPageModule.forChild(MoreListPage),
  ],
})
export class MoreListPageModule {}
