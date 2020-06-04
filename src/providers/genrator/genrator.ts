import { CacheService } from 'ionic-cache';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http'
import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { retryWhen } from 'rxjs/operators';



@Injectable()
export class GenratorProvider {

  ProductionURL = "https://www.hurrybunny.com/";
  devlomentURL = "http://hurrybunny.appsmatic.net/";

  private url;

  constructor(public http: Http, public cache: CacheService) {
    console.log('Hello GenratorProvider Provider');

    // if (localStorage.getItem('mode') == null) {
    //   this.url = this.devlomentURL;
    //   localStorage.setItem('mode', "development");
    // }
    // if (localStorage.getItem('mode') == "development") {
    //   this.url = this.devlomentURL;
    // } else if (localStorage.getItem('mode') == "Production") {
    //   this.url = this.ProductionURL;
    // }
    
    this.url = this.ProductionURL;

  }


  //Registeration
  signUp(registrData) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.post(this.url + 'api/customers/', JSON.stringify(registrData), { headers: headers })
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }


  //Get Customer Info
  getCustomerInfo(id) {
    return this.http.get(this.url + "api/customers/" + id).pipe(map(res => res.json()));
  }


  //Update Profile data
  updateProfile(credentials, id) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.put(this.url + 'api/customers/' + id, JSON.stringify(credentials), { headers: headers })
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }



  //Login
  login(credentials) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.post(this.url + 'api/customers/login', JSON.stringify(credentials), { headers: headers })
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }




  //Get Countries
  getCountries() {
    return this.http.get(this.url + "api/countries?ids=52,69").pipe(
      map(res => res.json()));
  }


  //Get Cites
  getCities(id) {
    return this.http.get(this.url + "api/states/" + id).pipe(
      map(res => res.json()));
  }


  //Get Districts
  getDistructs(country, state) {
    return this.http.get(this.url + "api/districts/country/" + country + "/state/" + state).pipe(
      map(res => res.json()));
  }




  //Get Resturants 
  getResturants(lat, lng, langId) {
    // let headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    // let request = this.http.post(this.url + "api/restaurants?Longtitude=" + lng + "&Latitude=" + lat+"&language_id="+langId, { headers: headers });
    // let delayType = 'all'; // this indicates that it should send a new request to the server every time, you can also set it to 'none' which indicates that it should only send a new request when it's expired
    // let cacheKey = "vendors"+langId;
    // return this.cache.loadFromDelayedObservable(cacheKey, request, cacheKey).pipe(
    //   map(res => res.json()  )  );

    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.post(this.url + "api/restaurants?Longtitude=" + lng + "&Latitude=" + lat + "&language_id=" + langId, { headers: headers })
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });

  }

  //Get resturant Info
  getResturantInfo(resId, langId) {
    let delayType = 'all';
    let request = this.http.get(this.url + "api/vendor?VendorId=" + resId + "&language_id=" + langId);
    let cacheKey = "resInfo" + resId + "lang" + langId;
    return this.cache.loadFromDelayedObservable(cacheKey, request, cacheKey).pipe(
      map(res => res.json()));

  }


  //Get resturant Info
  getResturantInfoForAds(resId, langId) {
    return this.http.get(this.url + "api/vendor?VendorId=" + resId + "&language_id=" + langId).pipe(
      map(res => res.json()));
  }

  //Get Categories of resturant 
  getCategories(id, langId) {
    let delayType = 'all';
    let request = this.http.get(this.url + "api/restaurant/categories?vendorid=" + id + "&language_id=" + langId + "&fields=id,name,description,image");
    let cacheKey = "categores" + id + "lang" + langId;
    return this.cache.loadFromDelayedObservable(cacheKey, request, cacheKey).pipe(
      map(res => res.json()));
  }



  //Get categorie meals 
  getMeals(catId, langId) {
    let delayType = 'all';
    let request = this.http.get(this.url + "api/restaurant/meals?CategoryId=" + catId + "&fields=vendor_id,id,name,short_description,full_description,price,attributes,images&language_id=" + langId);
    let cacheKey = "meals" + catId + "lang" + langId;
    return this.cache.loadFromDelayedObservable(cacheKey, request, cacheKey).pipe(
      map(res => res.json()));

  }


  //Get meals info
  getMealInfo(id, langId) {
    let delayType = 'all';
    let request = this.http.get(this.url + "api/restaurant/meal/info?id=" + id + "&language_id=" + langId);
    let cacheKey = "mealsinfo" + id + "lang" + langId;
    return this.cache.loadFromDelayedObservable(cacheKey, request, cacheKey).pipe(
      map(res => res.json()));
  }



  //Verify Phone Number
  VerifyPhon(countryCode, phoneNum) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.url + "api/customers/PhoneVerification?countrycode=" + countryCode + "&phoneno=" + phoneNum, { headers: headers }).pipe(
      map(res => res.json()));
  }


  //Get Addisions 
  getRelatedProducts(id, langId) {
    let request = this.http.get(this.url + "api/products/related?id=" + id + "&language_id=" + langId);
    let cacheKey = "additionscash" + id + "lang" + langId;
    return this.cache.loadFromDelayedObservable(cacheKey, request).pipe(
      map(res => res.json()));
  }


  //Add to shopping cart
  addToCart(item) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.post(this.url + 'api/shopping_cart_items/', JSON.stringify(item), { headers: headers })
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }



  //Get shopping cart items
  getShoppingCartItems(customerId, langId) {
    let delayType = 'all';
    let request = this.http.get(this.url + "api/shopping_cart_items?customerId=" + customerId + "&language_id=" + langId);
    let cacheKey = "shoppingcart" + customerId;
    return this.cache.loadFromDelayedObservable(cacheKey, request, cacheKey, 60 * 60, delayType).pipe(
      map(res => res.json()));
  }

  //Delete from shopping Cart 
  deleteFromShoppingCart(id) {
    return this.http.delete(this.url + "api/shopping_cart_items/" + id).pipe(
      map(res => res.json()));
  }


  //Update Cart
  updateCart(item, cartItemId) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.put(this.url + 'api/shopping_cart_items/' + cartItemId, JSON.stringify(item), { headers: headers })
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }


  //Get Resturant reviews 
  getResturantReviews(id) {
    return this.http.get(this.url + "api/restaurant/rating/" + id).pipe(
      map(res => res.json()));
  }


  //Add Resturant review
  addResturantReview(item) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.post(this.url + 'api/restaurant/rating', JSON.stringify(item), { headers: headers })
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }


  //Add meal review 
  addMealReview(item) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.post(this.url + 'api/product/rating', JSON.stringify(item), { headers: headers })
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });

  }


  //Get Meal reviews 
  getMealReviews(id) {
    return this.http.get(this.url + "api/product/rating/" + id).pipe(
      map(res => res.json()));
  }



  //Convert Cart to Order
  convertCartOrders(orderInfo) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.post(this.url + 'api/shoppingcart/confirmorder', JSON.stringify(orderInfo), { headers: headers })
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }


  //Get customer Orders
  getCustomerOrder(id, langId) {

    let delayType = 'all';
    let request = this.http.get(this.url + "api/orders/customer?customer_id=" + id + "&language_id=" + langId);
    let cacheKey = "customerorders" + id + "lang" + langId;
    return this.cache.loadFromDelayedObservable(cacheKey, request, cacheKey).pipe(
      map(res => res.json()));

  }

  //Get customer Orders
  getCustomerOrderNoCashing(id, langId) {
    return this.http.get(this.url + "api/orders/customer?customer_id=" + id + "&language_id=" + langId).pipe(
      map(res => res.json()));
  }


  //Get Order details
  getOrderDetails(orderId, langId) {
    let delayType = 'all';
    let request = this.http.get(this.url + "api/orders?id=" + orderId + "&language_id=" + langId);
    let cacheKey = "orderdetails" + orderId + "lang" + langId;
    return this.cache.loadFromDelayedObservable(cacheKey, request, cacheKey).pipe(
      map(res => res.json()));
  }



  //Convert Cart to Order
  changeOrderStatus(customerId,orderId, statusId) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.post(this.url + 'api/v2/order/status?CustomerId='+customerId+"&OrderId=" + orderId + "&StatusId=" + statusId, { headers: headers })
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });

  }



  //Get customer locations 
  getCustomerLocations(customerId) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.post(this.url + 'api/customer/addresses?CustomerId=' + customerId, { headers: headers })
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });

  }


  //Get Resturant branches
  getResturantBranches(vendorId, lat, lng) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.post(this.url + 'api/restaurant/branches/pickup?VendorId=' + vendorId + '&Longtitude=' + lng + '&Latitude=' + lat, { headers: headers })
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });

  }




  //Apply Discount Copaun
  ApplyDiscountCoupon(discountCode, customerId) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.post(this.url + '/api/cart/coupon/apply?discountcouponcode=' + discountCode + '&customerId=' + customerId, { headers: headers })
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }



  //Remove Discount Copaun
  RemoveDiscountCoupon(discountCode, customerId) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.post(this.url + '/api/cart/coupon/remove?discountcouponcode=' + discountCode + '&customerId=' + customerId, { headers: headers })
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }


  // Delete Location
  deleteLcation(id) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.post(this.url + 'api/customer/addresses/remove?LocationId=' + id, { headers: headers })
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }


  //Add new Location
  addNewLocation(location) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.post(this.url + 'api/customer/addresses/add', JSON.stringify(location), { headers: headers })
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }



  //Get Adds 
  getAdds() {
    let delayType = 'all';
    let request = this.http.get(this.url + "api/ads");
    let cacheKey = "adds"
    return this.cache.loadFromDelayedObservable(cacheKey, request, cacheKey).pipe(
      map(res => res.json()));
  }


  //Get Offers
  getOffers() {
    let delayType = 'all';
    let request = this.http.get(this.url + "api/offers");
    let cacheKey = "offers"
    return this.cache.loadFromDelayedObservable(cacheKey, request, cacheKey).pipe(
      map(res => res.json()));
  }


  //Send Discount Coupon to server 
  sendDiscountCodeToServer(discountCode, orderId) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.post(this.url + 'api/order/savediscount?orderId=' + orderId + '&discountCouponCode=' + discountCode, { headers: headers })
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }



  //Clear Cart
  clearCart(customerId) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.post(this.url + 'api/shopping_cart_items/clear?customerId=' + customerId, { headers: headers })
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }


  // Reorder
  reorder(orderId) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.post(this.url + 'api/order/reorder?OrderId=' + orderId, { headers: headers })
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }




  // send notification push token
  sendNotificationToken(customerId, token) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.post(this.url + 'api/customer/notification/maptoken?customerId=' + customerId + '&userToken=' + token, { headers: headers })
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }


  createPaymentPage(request){
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.post(this.url + 'api/payment/pt/createpage',JSON.stringify(request),{ headers: headers })
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }


  verifyPayment(p_id,order_id){
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.post(this.url + 'api/payment/pt/verify?payment_reference='+p_id+'&orderId='+order_id,{ headers: headers })
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }
}


