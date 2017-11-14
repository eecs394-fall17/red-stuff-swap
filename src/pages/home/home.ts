import { Component } from '@angular/core';

import {Observable} from "rxjs/Observable";
import { AngularFireDatabase } from 'angularfire2/database';
import {IonicPage} from "ionic-angular";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  _items: Observable<any[]>;

  constructor(private db: AngularFireDatabase) {
    this._items = this.db.list('/item').snapshotChanges().map(changes => {
      return changes.map(c => ({key: c.payload.key, ...c.payload.val()}))
    });
  }
}
