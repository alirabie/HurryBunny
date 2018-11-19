import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccountActivePage } from './account-active';

@NgModule({
  declarations: [
    AccountActivePage,
  ],
  imports: [
    IonicPageModule.forChild(AccountActivePage),
  ],
})
export class AccountActivePageModule {}
