import { Component, Input } from '@angular/core';
import { NavController, NavParams } from "ionic-angular";
import { UserService } from "../../providers/user-service/user-service";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { Observable } from "rxjs/Observable";
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
  _ordersRef: AngularFireList<any>;
  currentUserID: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private db:AngularFireDatabase, private user: UserService) {
    this._ordersRef = this.db.list('/order');
    //this.currentUserID = user.getCurrentUser().user_id;
  }

  ngOnInit(){
    const from = new Date(this.data.order.start_time);
    const to = new Date(this.data.order.end_time);
    this.startDate = `${from.getMonth() + 1}/${from.getDate()}/${from.getFullYear()}`;
    this.endDate = `${to.getMonth() + 1}/${to.getDate()}/${to.getFullYear()}`;
  }

  reserve(event){
    event.stopPropagation();
  }

  markAsRead(){
    console.log("Mark as read!");
  }

  private performAction(orderId, Status){
    this._ordersRef.update(orderId, {
      status: Status
    })
    console.log();
    console.log(`should change order status to: ${Status}`);
  }

}
