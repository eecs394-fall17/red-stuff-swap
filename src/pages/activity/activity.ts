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

  // delete code below when using data from database
  private _dummyData = [];

  private initDummyData(){
    const time = Date.now();
    let result = [];
    result.push({
      item: {
        image_url: "https://firebasestorage.googleapis.com/v0/b/red-stuff-swap.appspot.com/o/images%2F1510957369794.jpg?alt=media&token=5956bea9-44a4-4b39-92aa-c80c7df68b27",
        name: "Demo Item"
      },
      order: {
        start_time: time,
        end_time: time,
        status: "requested"
      },
      borrower: this.user.getCurrentUser(),
      identity: "borrower"
    });
    result.push({
      item: {
        image_url: "https://firebasestorage.googleapis.com/v0/b/red-stuff-swap.appspot.com/o/images%2F1510957369794.jpg?alt=media&token=5956bea9-44a4-4b39-92aa-c80c7df68b27",
        name: "Demo Item"
      },
      order: {
        start_time: time,
        end_time: time,
        status: "requested"
      },
      borrower: this.user.getCurrentUser(),
      identity: "lender"
    });
    result.push({
      item: {
        image_url: "https://firebasestorage.googleapis.com/v0/b/red-stuff-swap.appspot.com/o/images%2F1510957369794.jpg?alt=media&token=5956bea9-44a4-4b39-92aa-c80c7df68b27",
        name: "Demo Item"
      },
      order: {
        start_time: time,
        end_time: time,
        status: "request_denied"
      },
      borrower: this.user.getCurrentUser(),
      identity: "borrower"
    });
    result.push({
      item: {
        image_url: "https://firebasestorage.googleapis.com/v0/b/red-stuff-swap.appspot.com/o/images%2F1510957369794.jpg?alt=media&token=5956bea9-44a4-4b39-92aa-c80c7df68b27",
        name: "Demo Item"
      },
      order: {
        start_time: time,
        end_time: time,
        status: "request_confirmed"
      },
      borrower: this.user.getCurrentUser(),
      identity: "borrower"
    });
    result.push({
      item: {
        image_url: "https://firebasestorage.googleapis.com/v0/b/red-stuff-swap.appspot.com/o/images%2F1510957369794.jpg?alt=media&token=5956bea9-44a4-4b39-92aa-c80c7df68b27",
        name: "Demo Item"
      },
      order: {
        start_time: time,
        end_time: time,
        status: "request_confirmed"
      },
      borrower: this.user.getCurrentUser(),
      identity: "lender"
    });
    result.push({
      item: {
        image_url: "https://firebasestorage.googleapis.com/v0/b/red-stuff-swap.appspot.com/o/images%2F1510957369794.jpg?alt=media&token=5956bea9-44a4-4b39-92aa-c80c7df68b27",
        name: "Demo Item"
      },
      order: {
        start_time: time,
        end_time: time,
        status: "item_borrowed"
      },
      borrower: this.user.getCurrentUser(),
      identity: "borrower"
    });
    result.push({
      item: {
        image_url: "https://firebasestorage.googleapis.com/v0/b/red-stuff-swap.appspot.com/o/images%2F1510957369794.jpg?alt=media&token=5956bea9-44a4-4b39-92aa-c80c7df68b27",
        name: "Demo Item"
      },
      order: {
        start_time: time,
        end_time: time,
        status: "item_borrowed"
      },
      borrower: this.user.getCurrentUser(),
      identity: "lender"
    });
    result.push({
      item: {
        image_url: "https://firebasestorage.googleapis.com/v0/b/red-stuff-swap.appspot.com/o/images%2F1510957369794.jpg?alt=media&token=5956bea9-44a4-4b39-92aa-c80c7df68b27",
        name: "Demo Item"
      },
      order: {
        start_time: time,
        end_time: time,
        status: "item_received"
      },
      borrower: this.user.getCurrentUser(),
      identity: "borrower"
    });
    result.push({
      item: {
        image_url: "https://firebasestorage.googleapis.com/v0/b/red-stuff-swap.appspot.com/o/images%2F1510957369794.jpg?alt=media&token=5956bea9-44a4-4b39-92aa-c80c7df68b27",
        name: "Demo Item"
      },
      order: {
        start_time: time,
        end_time: time,
        status: "item_received"
      },
      borrower: this.user.getCurrentUser(),
      identity: "lender"
    });
    result.push({
      item: {
        image_url: "https://firebasestorage.googleapis.com/v0/b/red-stuff-swap.appspot.com/o/images%2F1510957369794.jpg?alt=media&token=5956bea9-44a4-4b39-92aa-c80c7df68b27",
        name: "Demo Item"
      },
      order: {
        start_time: time,
        end_time: time,
        status: "item_returned"
      },
      borrower: this.user.getCurrentUser(),
      identity: "borrower"
    });
    result.push({
      item: {
        image_url: "https://firebasestorage.googleapis.com/v0/b/red-stuff-swap.appspot.com/o/images%2F1510957369794.jpg?alt=media&token=5956bea9-44a4-4b39-92aa-c80c7df68b27",
        name: "Demo Item"
      },
      order: {
        start_time: time,
        end_time: time,
        status: "item_returned"
      },
      borrower: this.user.getCurrentUser(),
      identity: "lender"
    });
    result.push({
      item: {
        image_url: "https://firebasestorage.googleapis.com/v0/b/red-stuff-swap.appspot.com/o/images%2F1510957369794.jpg?alt=media&token=5956bea9-44a4-4b39-92aa-c80c7df68b27",
        name: "Demo Item"
      },
      order: {
        start_time: time,
        end_time: time,
        status: "return_confirmed"
      },
      borrower: this.user.getCurrentUser(),
      identity: "borrower"
    });
    this._dummyData = result;
  }
  // delete code above when using data from database

  constructor(private db:AngularFireDatabase, private user: UserService) {
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

    // delete code below when using data from database
    this.initDummyData();
    // delete code above when using data from database
  }

}
