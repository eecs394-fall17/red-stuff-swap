import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { Observable } from "rxjs/Observable";
import { UserService } from "../../providers/user-service/user-service";

@IonicPage()
@Component({
  selector: 'page-activity',
  templateUrl: 'activity.html',
})
export class ActivityPage {

  _itemsRef: AngularFireList<any>;
  _items: Observable<any[]>;
  _ordersRef: AngularFireList<any>;
  _orders: Observable<any[]>;

  private _requests = [];

  constructor(private db:AngularFireDatabase, user: UserService) {

    this._ordersRef = this.db.list('/order',
      ref => ref.orderByChild(`borrower_id`).equalTo(user.getCurrentUser().user_id));
    this._orders = this._ordersRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val()}));
    });

    this._itemsRef = this.db.list('/item');
    this._items = this._itemsRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });

    this._items.subscribe(items => {
      this._orders.subscribe( orders => {
        this._requests = [];

        orders.forEach( order => {
          for(let i = 0; i < items.length; i++){
            const item = items[i];
            if(item.key == order.item_id){
              this._requests.push({
                item: item,
                order: order,
                borrower: user.getUserById(order.borrower_id)
              });
            }
          }
        });
      });
    });
  }

}
