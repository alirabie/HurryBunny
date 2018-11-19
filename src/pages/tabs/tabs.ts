import { Component } from '@angular/core';
import {MainScreenPage} from '../main-screen/main-screen';
import { MoreListPage } from '../more-list/more-list';
import { OrdersPage } from '../orders/orders';
import { OffersPage } from '../offers/offers';

@Component({
    templateUrl: 'tabs.html'
  })
  export class TabsPage {
    oriantation = "";
    
    tab1Root = MainScreenPage;
    tab2Root = OrdersPage;
    tab3Root = MoreListPage;
    tab4Root = OffersPage;
  
    constructor() {

      if(localStorage.getItem('lang')=="en"){
        this.oriantation="ltr";
      }else{
        this.oriantation="rtl";
      }
  
    }



    checkLogin(){
      if(localStorage.getItem('customerid')===null){
        return false;
      }else{
        return true;
      }
    }


    
  }