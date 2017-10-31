import { Component } from '@angular/core';

import {Observable} from "rxjs/Observable";
import { AngularFireDatabase } from 'angularfire2/database';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	_items: Observable<any[]>;

  constructor(private db:AngularFireDatabase) {
    this._items = db.list('/item').valueChanges();
  }
}
