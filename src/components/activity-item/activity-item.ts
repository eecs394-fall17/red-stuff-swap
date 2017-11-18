import { Component, Input } from '@angular/core';
import { NavController, NavParams } from "ionic-angular";

/**
 * Generated class for the ActivityItemComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'activity-item',
  templateUrl: 'activity-item.html'
})
export class ActivityItemComponent {

  @Input('data') data: any;

  startDate : String;
  endDate: String;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  ngOnInit(){
    const from = new Date(this.data.order.start_time);
    const to = new Date(this.data.order.end_time);
    this.startDate = `${from.getMonth() + 1}/${from.getDate()}/${from.getFullYear()}`;
    this.endDate = `${to.getMonth() + 1}/${to.getDate()}/${to.getFullYear()}`;
    console.log(this.data.item.email);
  }

}
