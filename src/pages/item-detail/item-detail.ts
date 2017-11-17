import { Component } from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams, ToastController} from 'ionic-angular';
import {CalendarModal, CalendarModalOptions, DayConfig} from "ion2-calendar";
import {AngularFireDatabase, AngularFireList} from "angularfire2/database";
import {UserService} from "../../providers/user-service/user-service";
import * as moment from 'moment';
import {EmailComposer} from "@ionic-native/email-composer";
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
  buttonDisabled = false;
  datePickerHint = `Pick up dates of borrow and return first`;

  private _orderRef: AngularFireList<any>;
  private _disabledDates: DayConfig[] = [];
  private _canSelectDate = true;

  private fromDate: string;
  private fromDateRaw: Date;
  private fromTime: string;
  private toDate: string;
  private toDateRaw: Date;
  private toTime: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController,
              private toastCtrl: ToastController, private db: AngularFireDatabase, private user: UserService,
              private emailComposer: EmailComposer) {
  	this.item= this.navParams.get('item');

    this._orderRef = this.db.list('/order');

    this.db.list('/order',
      ref => ref.orderByChild(`borrower_id`).equalTo(user.getCurrentUser().user_id))
      .snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val()}));
    }).subscribe(orders => {
      const now = Date.now();
      for (let i = 0; i < orders.length; i++){
        let order = orders[i];
        if (order.start_time > now && order.status == `requested`){
          this.requested = true;
          const from = new Date(order.start_time);
          const to = new Date(order.end_time);

          this.fromTime = new Date(from.valueOf() - from.getTimezoneOffset() * 60000).toISOString();
          this.toTime = new Date(to.valueOf() - from.getTimezoneOffset() * 60000).toISOString();
          this.fromDate = `${from.getMonth() + 1}/${from.getDate()}/${from.getFullYear()}`;
          this.fromDateRaw = new Date(this.fromDate);
          this.toDate = `${to.getMonth() + 1}/${to.getDate()}/${to.getFullYear()}`;
          this.toDateRaw = new Date(this.toDate);
          this.buttonDisabled = true;
          this._canSelectDate = false;
          break;
        }
      }
    });

    this.db.list( `/order`,
      ref => ref.orderByChild(`item_id`).equalTo(this.item.key))
      .valueChanges().subscribe( orders => {
        this._disabledDates = [];
        const dayLength = 1000 * 60 * 60 * 24;
        orders.forEach(order => {
          if(order.status != `requested` && order.end_time > Date.now()){
            const from = new Date(order.start_time);
            const to = new Date(order.end_time);

            const range = to.valueOf() - from.valueOf();
            let days = (range - range % dayLength) / dayLength;
            if(range % dayLength != 0) days += 1;

            for(let i = 0; i< days; i++){
              this._disabledDates.push({
                date: new Date(from.valueOf() + i * dayLength),
                disable: true
              })
            }
          }
        });
        this.checkDateRange();
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
    this.toDate = `${timer.getMonth() + 1}/${timer.getDate()}/${timer.getFullYear()}`;
    this.toDateRaw = new Date(this.toDate);
  }

  requestItem(){
    if(this.buttonDisabled) return;

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
    if (!this._canSelectDate) return;

    const options: CalendarModalOptions = {
      title: 'PICK BORROW DATE',
      pickMode: 'range',
      daysConfig: this._disabledDates,
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
        this.checkDateRange();
      }
    })
  }

  checkDateRange(){
    const from = this.fromDateRaw.valueOf();
    const to = this.toDateRaw.valueOf();
    for(let i = 0; i<this._disabledDates.length;i++){
      const date = this._disabledDates[i].date.valueOf();
      if(date > from && date < to){
        this.buttonDisabled = true;
        this.datePickerHint = `Cannot select dates including item unavailable`;
        return;
      }
    }
    this.buttonDisabled = false;
    this.datePickerHint = ``;
    this.checkTime(from, to);
  }

  checkTime(from, to){
    if(from == to){
      if(new Date(this.fromTime).valueOf() >= new Date(this.toTime).valueOf()){
        this.buttonDisabled = true;
        this.datePickerHint = `Borrow time is ahead of return time`;
      }
    }
  }

  contactLender(){
    this.emailComposer.open({to: this.item.email, isHtml: true});
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
