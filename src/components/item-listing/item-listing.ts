import { Component, Input } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  showItemDetails() {
    this.navCtrl.push("ItemDetailPage", {
      item: this.data,
    });
  }

  openEditDialog(){
    this.navCtrl.push("EditItemPage", {
      data: this.data,
    });
  }
}
