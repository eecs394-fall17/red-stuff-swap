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

  constructor(private db:AngularFireDatabase, private user: UserService) {
    this._ordersRef = this.db.list('/order');
    this._orders = this._ordersRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val()}));
    });

    this._itemsRef = this.db.list('/item');
    this._items = this._itemsRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });


    this._items.subscribe(items => {
      this._orders.subscribe( orders => {
        let requests = [];

        orders.forEach( order => {
          for(let i = 0; i < items.length; i++){
            const item = items[i];
            if(item.key == order.item_id && user.getCurrentUser().user_id == order.borrower_id){
              requests.push({
                item: item,
                order: order,
                borrower: user.getUserById(order.borrower_id),
                identity: 'borrower',
              });
            }

            if(item.key == order.item_id && user.getCurrentUser().user_id == order.lender_id){
              requests.push({
                item: item,
                order: order,
                borrower: user.getUserById(order.borrower_id),
                identity: 'lender'
              });
            }
          }
        });

        this._requestSource.next(requests);
      });
    });
  }

}
