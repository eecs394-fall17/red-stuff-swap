import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { UserService } from "../user-service/user-service";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

/*
  Generated class for the OrderService provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class OrderService {

  private _itemsRef: AngularFireList<any>;
  private _items: Observable<any[]>;
  private _ordersRef: AngularFireList<any>;
  private _orders: Observable<any[]>;

  private _requestSource = new BehaviorSubject<any>(null);
  requests$ = this._requestSource.asObservable();

  private _newMsgSource = new BehaviorSubject<any>(null);
  newMsgNum$ = this._newMsgSource.asObservable();

  constructor(private db:AngularFireDatabase,user: UserService) {
    this._ordersRef = this.db.list('/order');
    this._orders = this._ordersRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val()}));
    });

    this._itemsRef = this.db.list('/item');
    this._items = this._itemsRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
    user.currentUser.subscribe(u => {
      this._items.subscribe(items => {
        this._orders.subscribe( orders => {
          let requests = [];
          let newMsgs = 0;

          orders.forEach( order => {
            for(let i = 0; i < items.length; i++){
              const item = items[i];
              if(item.key == order.item_id && u.user_id == order.borrower_id){
                requests.push({
                  item: item,
                  order: order,
                  borrower: user.getUserById(order.borrower_id),
                  identity: 'borrower',
                });
                if(!order.borrower_has_read){
                  newMsgs += 1;
                }
              }

              if(item.key == order.item_id && u.user_id == order.lender_id){
                requests.push({
                  item: item,
                  order: order,
                  borrower: user.getUserById(order.borrower_id),
                  identity: 'lender'
                });
                if(!order.lender_has_read){
                  newMsgs += 1;
                }
              }
            }
          });

          this._requestSource.next(requests);
          this._newMsgSource.next(newMsgs);
        });
      });
    });
  }

}
