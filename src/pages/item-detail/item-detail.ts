import { Component } from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams, ToastController} from 'ionic-angular';
import {CalendarModal, CalendarModalOptions} from "ion2-calendar";
import {AngularFireDatabase, AngularFireList} from "angularfire2/database";
import * as firebase from "firebase";
import {UserService} from "../../providers/user-service/user-service";
import { Observable } from "rxjs/Observable";
import * as moment from 'moment';
/**
 * Generated class for the ItemDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html',
})
export class ItemDetailPage {

	item: any;
  stars = ["star", "star", "star", "star", "star"];

  requested = false;
  requesting = false;

  private _orderRef: AngularFireList<any>;
  private _orders: Observable<any[]>;
  private _userRelatedOrders: Observable<any[]>;
  private _relatedOrders: Observable<any[]>;

  private fromDate: string;
  private fromDateRaw: Date;
  private fromTime: string;
  private toDate: string;
  private toDateRaw: Date;
  private toTime: string;

  // private createTime: number;
  // private item_id: string;
  // private fromDate_1: number;
  // private toDate_1: number;
  // private borrower_id: number;
  // private owner_id: string;
  // private number: number;
  // private item_id_1: string;
  // private hourAndMinute: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController,
              private toastCtrl: ToastController, private db: AngularFireDatabase, private user: UserService) {
  	this.item= this.navParams.get('item');

    this._orderRef = this.db.list('/order');
    // this._orders = this._orderRef.snapshotChanges().map(changes => {
    //   return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    // });

    this.db.list('/order',
      ref => ref.orderByChild(`borrower_id`).equalTo(user.getCurrentUser().user_id))
      .snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val()}));
    }).subscribe(orders => {
      const now = Date.now();
      for (let i = 0; i < orders.length; i++){
        let order = orders[i];
        if (order.start_time > now){
          this.requested = true;
          const from = new Date(order.start_time);
          const to = new Date(order.end_time);

          this.fromTime = new Date(from.valueOf() - from.getTimezoneOffset() * 60000).toISOString();
          this.toTime = new Date(to.valueOf() - from.getTimezoneOffset() * 60000).toISOString();
          this.fromDate = `${from.getMonth() + 1}/${from.getDate()}/${from.getFullYear()}`;
          this.fromDateRaw = new Date(this.fromDate);
          this.toDate = `${to.getMonth() + 1}/${to.getDate() + 1}/${to.getFullYear()}`;
          this.toDateRaw = new Date(this.toDate);
          break;
        }
      }
    });
  }

  ngOnInit(){
    let counter = 0;
    for(let i = 0; i < Math.floor(this.item.rating); i++){
      this.stars[counter] = "star";
      counter++;
    }
    if(this.item.rating - counter >= 0.5){
      this.stars[counter] = "star-half";
    }else{
      this.stars[counter] = "star-outline";
    }
    counter++;
    for(let i = 0; i < 4 - Math.floor(this.item.rating); i++){
      this.stars[counter] = "star-outline";
      counter++;
    }
    let timer = new Date();
    this.fromTime = new Date(Date.now() - timer.getTimezoneOffset() * 60000).toISOString();
    this.toTime = new Date(Date.now() - timer.getTimezoneOffset() * 60000).toISOString();
    this.fromDate = `${timer.getMonth() + 1}/${timer.getDate()}/${timer.getFullYear()}`;
    this.fromDateRaw = new Date(this.fromDate);
    this.toDate = `${timer.getMonth() + 1}/${timer.getDate() + 1}/${timer.getFullYear()}`;
    this.toDateRaw = new Date(this.toDate);
  }

  requestItem(){
    // todo use Date.parse('Thu, 01 Jan 1970 00:00:00 GMT-0400') to parse time data
    // source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse

    let fTime = new Date(this.fromTime);
    let tTime = new Date(this.toTime);
    let from = moment(`${this.fromDateRaw.toLocaleDateString()} ${fTime.getUTCHours()}:${fTime.getUTCMinutes()}`,
      `MM/DD/YYYY HH:mm`);
    let to = moment(`${this.toDateRaw.toLocaleDateString()} ${tTime.getUTCHours()}:${tTime.getUTCMinutes()}`,
      `MM/DD/YYYY HH:mm`);
    this.requesting = true;
    this._orderRef.push({
      borrower_id: this.user.getCurrentUser().user_id,
      lender_id: this.item.person_id,
      item_id: this.item.key,
      status: `requested`,
      start_time: from.valueOf(),
      end_time: to.valueOf(),
      time_created: Date.now()
    }).then(()=>{
      this.requesting = false;
      this.requested = true;
    });
  }

  openCalendar() {
    const options: CalendarModalOptions = {
      title: 'PICK BORROW DATE',
      pickMode: 'range',
      defaultDateRange: {
        from: this.fromDateRaw,
        to: this.toDateRaw
      }
    };
    let myCalendar =  this.modalCtrl.create(CalendarModal, {
      options: options
    });

    myCalendar.present();

    myCalendar.onDidDismiss((dates, role) => {
      if(dates != null){
        let from = dates.from;
        let to = dates.to;
        this.fromDate = `${from.months}/${from.date}/${from.years}`;
        this.fromDateRaw = from.dateObj;
        this.toDate = `${to.months}/${to.date}/${to.years}`;
        this.toDateRaw = to.dateObj;
      }
    })
  }

  contactLender(){
    this.presentToast(`This function is still under development.`);
  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

}
