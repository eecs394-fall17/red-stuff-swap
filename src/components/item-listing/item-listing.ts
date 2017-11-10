import { Component, Input } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import {EmailComposer} from "@ionic-native/email-composer";

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private emailComposer: EmailComposer) {}

  showItemDetails() {
    this.navCtrl.push("ItemDetailPage", {
      item: this.data,
    });
  }

  openEmailDialog() {
    // const newEmailModal:Modal = this.modalCtrl.create('EmailPage', {email: this.data.email, name: this.data.person_name});
    // newEmailModal.present();
    this.emailComposer.open({to: this.data.email, isHtml: true});
  }

  openEditDialog(){
    this.navCtrl.push("EditItemPage", {
      data: this.data,
    });
  }

  reserve(event){
    event.stopPropagation();
  }
}
