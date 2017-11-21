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
  //currentUserID: string;

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
    if(this.data.identity == 'lender') {
      if(!this.data.order.lender_has_read)
      this._ordersRef.update(this.data.order.key, {
        lender_has_read: true,
      })
    }
    else if(this.data.identity == 'borrower') {
      if(!this.data.order.borrower_has_read)
      this._ordersRef.update(this.data.order.key, {
        borrower_has_read: true,
      })
    }
    console.log(this.data.order.key);
    //console.log("Mark as read!");
  }


  private performAction(orderId, Status){
    if(this.data.identity == 'lender') {
      this._ordersRef.update(orderId, {
        status: Status,
        lender_has_read: true,
        borrower_has_read: false
      })
    }
    else if(this.data.identity == 'borrower') {
      this._ordersRef.update(orderId, {
        status: Status,
        lender_has_read: false,
        borrower_has_read: true
      })
    }
    console.log();
    console.log(`should change order status to: ${Status}`);
  }

}
