import { GenratorProvider } from './../providers/genrator/genrator';
import { ResturantReviewPage } from './../pages/resturant-review/resturant-review';
import { Firebase } from '@ionic-native/firebase';

import { Diagnostic } from '@ionic-native/diagnostic';
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, MenuController, NavController, AlertController, Events, ToastController, Alert, ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService } from '@ngx-translate/core';
import { HomePage } from '../pages/home/home';
import { MainScreenPage } from '../pages/main-screen/main-screen';
import { IntroScreenPage } from '../pages/intro-screen/intro-screen';
import { LoginPage } from '../pages/login/login';
import { ProfilePage } from '../pages/profile/profile';
import { ViewController } from 'ionic-angular';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { tap } from 'rxjs/operators';
import { CacheService } from "ionic-cache";
import { OrdersPage } from '../pages/orders/orders';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';



@Component({
    templateUrl: 'app.html'
})



export class MyApp {

    public rootPage: any = IntroScreenPage;
    @ViewChild('content') nav: NavController;


    loggedOut = false;
    loggedIn = false;

    showedAlert: boolean;
    confirmAlert;

    constructor(public platform: Platform, public localNotifications: LocalNotifications, public modelCtrl: ModalController, public genrator: GenratorProvider, public tost: ToastController, cache: CacheService, public evnts: Events, statusBar: StatusBar, public fcm: Firebase, public alertCtrl: AlertController, splashScreen: SplashScreen, private translateService: TranslateService, events: Events, public menuCtrl: MenuController, toastCtrl: ToastController) {

        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            cache.setDefaultTTL(1 * 1); //set default cache TTL for 1 hour
            // cache.clearAll();
            // Keep our cached results when device is offline!
            this.checkLastOrder();
            cache.setOfflineInvalidate(false);
            if (this.platform.is('cordova')) {
                this.getToken();
                this.listenToNotifications();
            }

            this.listenConnection();
            translateService.setDefaultLang('ar');

            if (localStorage.getItem('lang') == null) {
                localStorage.setItem('lang', "2");
            }




            statusBar.styleDefault();
            splashScreen.hide();
            this.showedAlert = false;

            // Confirm exit
            this.platform.registerBackButtonAction(() => {
                if (this.nav.length() == 1) {
                    if (!this.showedAlert) {
                        this.confirmExitApp();
                    } else {
                        this.showedAlert = false;
                        this.confirmAlert.dismiss();
                    }
                }

                this.nav.pop();
            });




        });
    }


    confirmExitApp() {
        this.showedAlert = true;
        this.confirmAlert = this.alertCtrl.create({
            title: this.translateService.instant('PAGE_TITLE.dilog'),
            message: this.translateService.instant('exitapp'),
            buttons: [
                {
                    text: this.translateService.instant('no'),
                    handler: () => {
                        this.showedAlert = false;
                        return;
                    }
                },
                {
                    text: this.translateService.instant('yes'),
                    handler: () => {
                        this.platform.exitApp();
                    }
                }
            ]
        });
        this.confirmAlert.present();

    }



    //Check connectivety
    private listenConnection(): void {

        let disconnectedToast = this.tost.create({
            message: this.translateService.instant('checkinternetconect'),
            position: 'top',
            cssClass: 'toaastcss',
            showCloseButton: true,
            closeButtonText: this.translateService.instant('BUTTONS.dissmiss')

        });

        document.addEventListener("online", () => {
            console.log("Internet available");
            disconnectedToast.dismiss();
        }, false);

        document.addEventListener("offline", () => {


            disconnectedToast.present();



            // let alert = this.alertCtrl.create({
            //     title: this.translateService.instant('PAGE_TITLE.dilog'),
            //     subTitle: this.translateService.instant('checkinternetconect'),
            //     buttons: [
            //         {
            //             text: this.translateService.instant('exit'),
            //             handler: () => {
            //                 this.platform.exitApp();
            //             }
            //         }
            //     ]
            // });
            // alert.present();
        }, false);

    }




    async getToken() {

        let token;
        if (this.platform.is('android')) {
            token = await this.fcm.getToken()
        }

        if (this.platform.is('ios')) {
            token = await this.fcm.getToken();
            await this.fcm.grantPermission();
        }

        if (localStorage.getItem('customerid') === null) {

        } else {
            this.sendTokenToServer(localStorage.getItem('customerid'), token);
        }
        localStorage.setItem("notificationToken", token);
        //Save token any wahere
        console.log("TOKEN : " + token);

    }


    listenToNotifications() {
        //Notifications
        var self = this
        //Notifications
        this.fcm.subscribe('all');
        this.fcm.onNotificationOpen().subscribe(data => {
            if (data.wasTapped) {
                // alert("Received in background");
            } else {

                let messageText: string;
                if (this.platform.is('android')) {
                    messageText = data.body;
                }

                if (this.platform.is('ios')) {
                    messageText = data.aps.alert;
                }

                if (localStorage.getItem('customerid') === null) {

                } else {
                    if (messageText.length != 0) {
                        let alert = this.alertCtrl.create({
                            title: this.translateService.instant('PAGE_TITLE.dilog'),
                            subTitle: messageText,
                            buttons: [this.translateService.instant('BUTTONS.dissmiss')]
                        });
                        alert.present();
                    }
                    this.nav.push(OrdersPage);
                    this.sendLocalNotification(messageText, false);
                }
            }
        });


        this.fcm.onTokenRefresh().subscribe(token => {
            if (localStorage.getItem('customerid') === null) {

            } else {
                this.sendTokenToServer(localStorage.getItem('customerid'), token);

            }
            localStorage.setItem("notificationToken", token);
        });
        //end notifications.
        //end notifications.

    }


    //Send Local Notification
    sendLocalNotification(msg, isAndroid: boolean) {
        // Schedule a single notification
        this.localNotifications.schedule({
            title: "SEFERY",
            text: msg + ""
        });
    }

    sendTokenToServer(customerid, token) {
        this.genrator.sendNotificationToken(customerid, token).then((data: any) => {
            console.log("TOKEN SENT : "+JSON.stringify(data));
        }, (err) => {
          console.log("TOKEN SEND ERROR "+JSON.stringify(err));
        });
    }

    checkLastOrder() {
        if (localStorage.getItem("customerid") != null) {
            if (localStorage.getItem("rated") != null) {
                return this.genrator.getCustomerOrderNoCashing(localStorage.getItem("customerid"), localStorage.getItem('lang')).subscribe((data) => {
                    let customerOrders = [];
                    customerOrders = data['orders'];
                    if (customerOrders.length != 0) {

                        let order = customerOrders[0]

                        console.log(order);
                        if (order.order_status_id == "60") {
                            let modal = this.modelCtrl.create(ResturantReviewPage, { "order": JSON.stringify(order) }, { showBackdrop: true, enableBackdropDismiss: true });
                            modal.present();
                        } else if (order.order_status_id == "80") {
                            let modal = this.modelCtrl.create(ResturantReviewPage, { "order": JSON.stringify(order) }, { showBackdrop: true, enableBackdropDismiss: true });
                            modal.present();
                        }
                    }
                }, (err) => {
                    console.log(err);
                });


            }

        }
    }

}

