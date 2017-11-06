import { Component } from '@angular/core';

import {Observable} from "rxjs/Observable";
import { AngularFireDatabase } from 'angularfire2/database';
import {IonicPage, NavController} from "ionic-angular";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	_items: Observable<any[]>;

  constructor(private db:AngularFireDatabase, private navCtrl: NavController) {
    this._items = this.db.list('/item').valueChanges();
  }

  addNewItem(){
    this.navCtrl.push("NewItemPage");
  }
}
