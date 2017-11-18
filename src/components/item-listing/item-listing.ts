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

  constructor(public navCtrl: NavController, public navParams: NavParams, private db:AngularFireDatabase,
              private app: App) {
    this._itemsRef = this.db.list('/item');
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
  }
}
