import { CacheService } from 'ionic-cache';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/map'
import { retryWhen } from 'rxjs/operators';


@Injectable()
export class GenratorProvider {

  ProductionURL = "https://www.hurrybunny.com/";
  devlomentURL = "http://hurrybunny.appsmatic.net/";

  private url;

  constructor(public http: Http, public cache: CacheService) {
    console.log('Hello GenratorProvider Provider');

    if (localStorage.getItem('mode') == null) {
      this.url = this.devlomentURL;
      localStorage.setItem('mode', "development");
    }
  

    if (localStorage.getItem('mode') == "development") {
      this.url = this.devlomentURL;
    } else if (localStorage.getItem('mode') == "Production") {
      this.url = this.ProductionURL;
    }


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
    return this.http.get(this.url + "api/customers/" + id).map((res: Response) => res.json());
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
    return this.http.get(this.url + "api/countries?ids=52,69").map((res: Response) => res.json());
  }


  //Get Cites
  getCities(id) {
    return this.http.get(this.url + "api/states/" + id).map((res: Response) => res.json());
  }


  //Get Districts
  getDistructs(country, state) {
    return this.http.get(this.url + "api/districts/country/" + country + "/state/" + state).map((res: Response) => res.json());
  }




  //Get Resturants 
  getResturants(lat, lng) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let request = this.http.post(this.url + "api/restaurants?Longtitude=" + lng + "&Latitude=" + lat, { headers: headers });
    let delayType = 'all'; // this indicates that it should send a new request to the server every time, you can also set it to 'none' which indicates that it should only send a new request when it's expired
    let cacheKey = "vendors";
    return this.cache.loadFromDelayedObservable(cacheKey, request, cacheKey, 60 * 60, delayType).map((res: Response) => res.json());

  }

  //Get resturant Info
  getResturantInfo(resId) {
    let delayType = 'all';
    let request = this.http.get(this.url + "api/vendor?VendorId=" + resId);
    let cacheKey = "resInfo" + resId;
    return this.cache.loadFromDelayedObservable(cacheKey, request, cacheKey, 60 * 60, delayType).map((res: Response) => res.json());

  }


  //Get resturant Info
  getResturantInfoForAds(resId) {
    return this.http.get(this.url + "api/vendor?VendorId=" + resId).map((res: Response) => res.json());
  }

  //Get Categories of resturant 
  getCategories(id) {
    let delayType = 'all';
    let request = this.http.get(this.url + "api/restaurant/categories?vendorid=" + id + "&fields=id,name,description,image");
    let cacheKey = "categores" + id;
    return this.cache.loadFromDelayedObservable(cacheKey, request, cacheKey, 60 * 60, delayType).map((res: Response) => res.json());
  }



  //Get categorie meals 
  getMeals(catId) {
    let delayType = 'all';
    let request = this.http.get(this.url + "api/restaurant/meals?CategoryId=" + catId + "&fields=vendor_id,id,name,short_description,full_description,price,images,currency_code");
    let cacheKey = "meals" + catId;
    return this.cache.loadFromDelayedObservable(cacheKey, request, cacheKey, 60 * 60, delayType).map((res: Response) => res.json());

  }


  //Get meals info
  getMealInfo(id) {
    let delayType = 'all';
    let request = this.http.get(this.url + "api/restaurant/meals/" + id + "?fields=vendor_id,id,name,short_description,full_description,price,currency_code,attributes,images,rating");
    let cacheKey = "mealsinfo" + id;
    return this.cache.loadFromDelayedObservable(cacheKey, request, cacheKey).map((res: Response) => res.json());
  }



  //Verify Phone Number
  VerifyPhon(countryCode, phoneNum) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.url + "api/customers/PhoneVerification?countrycode=" + countryCode + "&phoneno=" + phoneNum, { headers: headers }).map((res: Response) => res.json());
  }


  //Get Addisions 
  getRelatedProducts(id) {
    let request = this.http.get(this.url + "api/products/related/" + id);
    let cacheKey = "additionscash" + id;
    return this.cache.loadFromDelayedObservable(cacheKey, request).map((res: Response) => res.json());
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
  getShoppingCartItems(customerId) {
    let delayType = 'all';
    let request = this.http.get(this.url + "api/shopping_cart_items/" + customerId);
    let cacheKey = "shoppingcart" + customerId;
    return this.cache.loadFromDelayedObservable(cacheKey, request, cacheKey).map((res: Response) => res.json());
  }

  //Delete from shopping Cart 
  deleteFromShoppingCart(id) {
    return this.http.delete(this.url + "api/shopping_cart_items/" + id).map((res: Response) => res.json());
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
    return this.http.get(this.url + "api/restaurant/rating/" + id).map((res: Response) => res.json());
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
    return this.http.get(this.url + "api/product/rating/" + id).map((res: Response) => res.json());
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
  getCustomerOrder(id) {

    let delayType = 'all';
    let request = this.http.get(this.url + "api/orders/customer/" + id);
    let cacheKey = "customerorders" + id;
    return this.cache.loadFromDelayedObservable(cacheKey, request, cacheKey).map((res: Response) => res.json());

  }

  //Get customer Orders
  getCustomerOrderNoCashing(id) {
    return this.http.get(this.url + "api/orders/customer/" + id).map((res: Response) => res.json());
  }


  //Get Order details
  getOrderDetails(orderId) {

    let delayType = 'all';
    let request = this.http.get(this.url + "/api/orders/" + orderId);
    let cacheKey = "orderdetails" + orderId;
    return this.cache.loadFromDelayedObservable(cacheKey, request, cacheKey).map((res: Response) => res.json());
  }



  //Convert Cart to Order
  changeOrderStatus(orderId, statusId) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.post(this.url + 'api/order/status?OrderId=' + orderId + "&StatusId=" + statusId, { headers: headers })
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
    return this.cache.loadFromDelayedObservable(cacheKey, request, cacheKey).map((res: Response) => res.json());
  }


  //Get Offers
  getOffers() {
    let delayType = 'all';
    let request = this.http.get(this.url + "api/offers");
    let cacheKey = "offers"
    return this.cache.loadFromDelayedObservable(cacheKey, request, cacheKey).map((res: Response) => res.json());
  }

}
