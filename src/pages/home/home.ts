import { Component } from '@angular/core';
import {IonicPage} from "ionic-angular";

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  _itemsRef: AngularFireList<any>;
  _items: Observable<any[]>;

  constructor(private db:AngularFireDatabase) {
    this._itemsRef = this.db.list('/item');
    this._items = this._itemsRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }
}
