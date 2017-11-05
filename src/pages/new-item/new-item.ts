import { Component } from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {AngularFireDatabase, AngularFireList} from "angularfire2/database";

/**
 * Generated class for the NewItemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-item',
  templateUrl: 'new-item.html',
})
export class NewItemPage {

  private _itemRef: AngularFireList<any>;

  private itemName: string = "";
  private itemDescription: string = "";
  private lendTime: number = 7;
  private itemImgUrl: string = "";
  private credit: number = 10;

  constructor(private db:AngularFireDatabase, private navCtrl: NavController) {
    this._itemRef = this.db.list('/item');
  }

  addItem(){
    this._itemRef.push({
      credit: this.credit,
      image_url: this.itemImgUrl,
      name: this.itemName,
      rating: 0,
      reviews_num: 0,
      status: "on_shell",
      time_created: Date.now(),
      time_range: this.lendTime,
      description: this.itemDescription,
      // todo change these after user system is done
      email: "swethaviswanatha2018@u.northwestern.edu",
      person_name: "Swetha"
    });
    this.navCtrl.pop();
  }

  uploadImage(){
    if(this.itemImgUrl != ""){
      this.itemImgUrl = "";
    }else{
      this.itemImgUrl = "https://firebasestorage.googleapis.com/v0/b/red-stuff-swap.appspot.com/o/31j86wY4VwL._SL500_AC_SS350_.jpg?alt=media&token=a8e609a0-5bc2-43b3-b30e-e13dda997311";
    }
  }
}
