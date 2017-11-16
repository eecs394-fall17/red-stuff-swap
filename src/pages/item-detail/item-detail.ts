import { Component } from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams, ToastController} from 'ionic-angular';
import {CalendarModal, CalendarModalOptions} from "ion2-calendar";
import {AngularFireDatabase, AngularFireList} from "angularfire2/database";
import * as firebase from "firebase";
import {UserService} from "../../providers/user-service/user-service";
import { Observable } from "rxjs/Observable";
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
  _items2: Observable<any[]>;

  requested = false;
  private fromDate: string;
  private fromTime: string;
  private toDate: string;
  private toTime: string;
  private createTime: number;
  private item_id: string;
  private _itemRef: AngularFireList<any>;
  private fromDate_1: number;
  private toDate_1: number;
  private borrower_id: number;
  private owner_id: string;
  private number: number;
  private item_id_1: string;
  private hourAndMinute: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController,
              private toastCtrl: ToastController, private db: AngularFireDatabase) {
  	this.item= this.navParams.get('item');
  	this.number = 0;
    let us = new UserService();
    this.borrower_id = us.getCurrentUser().user_id;
    this._itemRef = this.db.list('/order');
    this._items2 = this._itemRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
    var ref = firebase.database().ref("/order");
    ref.orderByChild('borrower_id').equalTo(1).on("child_added", function(snapshot) {
      console.log(snapshot.key);
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
    this.toDate = `${timer.getMonth() + 1}/${timer.getDate()}/${timer.getFullYear()}`;
    this.createTime = timer.getTime();
    this.fromDate_1 = timer.getTime();
    this.toDate_1 = timer.getTime();
    this.owner_id = this.item.person_id;
    this.item_id_1 = this.item.key;
  }

  requestItem(){
    if(this.number == 0) {
      this.number = 1;
      this.requested = !this.requested;
      this._itemRef.push({
        item_id: this.item.key,
        end_date: this.toDate_1,
        time_created: this.createTime,
        owner_id: this.owner_id,
        start_date: this.fromDate_1,
        status: 'request_sent',
        borrower_id: this.borrower_id,
      });
    }
    else if(this.number == 1) {
      this.presentToast(`You have sent a request.`);
    }
    // todo use Date.parse('Thu, 01 Jan 1970 00:00:00 GMT-0400') to parse time data
    // source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse
  }

  openCalendar(label) {
    const options: CalendarModalOptions = {
      title: 'PICK DATE',
    };
    let myCalendar =  this.modalCtrl.create(CalendarModal, {
      options: options
    });

    myCalendar.present();

    myCalendar.onDidDismiss((date, role) => {
      if(date != null){
        if(label == 'from'){
          this.fromDate = `${date.months}/${date.date}/${date.years}`;
          var date1 = `${date.years}-${date.months}-${date.date} ${date.hour}:${date.minute}`;
          var date2 = new Date(Date.parse(date1.replace(/-/g, "/")));
          this.fromDate_1 = date2.getTime();
        }else{
          this.toDate = `${date.months}/${date.date}/${date.years}`;
          var date3 = `${date.years}-${date.months}-${date.date}  ${date.hour}:${date.minute}`;
          var date4 = new Date(Date.parse(date3.replace(/-/g, "/")));
          this.fromDate_1 = date4.getTime();
        }
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
