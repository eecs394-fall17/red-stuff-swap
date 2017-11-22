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
  fullItemList: Array<any>;
  filteredItems: Array<any>;

  constructor(private db:AngularFireDatabase) {
    this._itemsRef = this.db.list('/item');
  }

  ngOnInit(){
    this._itemsRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    }).subscribe(dataArray => {
      this.fullItemList = dataArray;
      this.initializeItems();
    });
  }

  initializeItems(){
    this.filteredItems = this.fullItemList;
  }

  getItems(searchbar) {
    // Reset items back to all of the items
    this.initializeItems();

    // set q to the value of the searchbar
    let q = searchbar.srcElement.value;


    // if the value is an empty string don't filter the items
    if (!q) {
      return;
    }

    this.filteredItems = this.filteredItems.filter((v) => {
      if(v.name && q) {
        if (v.name.toLowerCase().indexOf(q.toLowerCase()) > -1 ||
          v.description.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  }
}
