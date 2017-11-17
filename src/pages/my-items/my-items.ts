import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-my-items',
  templateUrl: 'my-items.html',
})
export class MyItemsPage {

	_itemsRef: AngularFireList<any>;
	_items: Observable<any[]>

  constructor(public navCtrl: NavController, public navParams: NavParams, private db:AngularFireDatabase) {
  	this._itemsRef = this.db.list('/item');
    this._items = this._itemsRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }

}
