import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFireDatabase, AngularFireObject } from "angularfire2/database";

/**
 * Generated class for the EditItemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-item',
  templateUrl: 'edit-item.html',
})
export class EditItemPage {

  private _itemRef: AngularFireObject<any>;

  private data: any;

  constructor(private db:AngularFireDatabase, private navCtrl: NavController, public navParams: NavParams) {

    this.data = this.navParams.get('data');
    this._itemRef = this.db.object('/item/');//unsure how to just access the specific object we're looking for
  }

  editItem(){
  	// something about update()
    // this.navCtrl.pop();
  }

  uploadImage(){
    if(this.itemImgUrl != ""){
      this.itemImgUrl = "";
    }else{
      this.itemImgUrl = "https://firebasestorage.googleapis.com/v0/b/red-stuff-swap.appspot.com/o/31j86wY4VwL._SL500_AC_SS350_.jpg?alt=media&token=a8e609a0-5bc2-43b3-b30e-e13dda997311";
    }
  }

}
