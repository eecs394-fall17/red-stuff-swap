import { Component } from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams, ToastController} from 'ionic-angular';
import {CalendarModal, CalendarModalOptions} from "ion2-calendar";

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
  private fromDate: string;
  private fromTime: string;
  private toDate: string;
  private toTime: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController,
              private toastCtrl: ToastController) {
  	this.item= this.navParams.get('item');
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
  }

  requestItem(){
    this.requested = !this.requested;
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
        }else{
          this.toDate = `${date.months}/${date.date}/${date.years}`;
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
