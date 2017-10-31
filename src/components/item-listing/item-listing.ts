import { Component, Input, Output } from '@angular/core';
import { ModalController, IonicPage, NavController, NavParams } from 'ionic-angular';

import { ItemDetailPage } from '../../pages/item-detail/item-detail';

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
  constructor(
    public modalController: ModalController,
    public navCtrl: NavController,
    public navParams: NavParams,
    ) {}

  showItemDetails() {
    this.navCtrl.push(ItemDetailPage, {
      itemName: this.name,
    });
  }
}
