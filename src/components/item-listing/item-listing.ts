import { Component, Input } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';
import { AngularFireList, AngularFireDatabase } from "angularfire2/database";

/**
 * Generated class for the ItemListingComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'item-listing',
  templateUrl: 'item-listing.html'
})
export class ItemListingComponent {

  @Input('data') data: any;

  private _itemsRef: AngularFireList<any>;
  private _ordersRef: AngularFireList<any>;
  private _relatedOrders: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private db:AngularFireDatabase,
              private app: App) {
  }

  ngOnInit(){
    this._itemsRef = this.db.list('/item');
    this._ordersRef = this.db.list('/order', ref => ref.orderByChild(`item_id`).equalTo(this.data.key));
  }

  showItemDetails() {
    this.app.getRootNav().push("ItemDetailPage", {
      item: this.data,
    });
  }

  openEditDialog(){
    this.app.getRootNav().push("EditItemPage", {
      data: this.data,
    });
  }

  deleteItem(){
    this._itemsRef.remove(this.data.key);
    this._ordersRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    }).subscribe(orders=>{
      this._relatedOrders = orders;
      this.deleteRelatedOrders();
    });
  }

  private deleteRelatedOrders(){
    this._relatedOrders.forEach(order => {
      this._ordersRef.remove(order.key);
    });
  }
}
