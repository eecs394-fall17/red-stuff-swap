import { Component, ViewChild, ElementRef  } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ItemListingComponent } from '../../components/item-listing/item-listing';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	items: Array<ItemListingComponent>;

  constructor(public navCtrl: NavController) {
  	this.items = new Array();

  	this.populateItems();
  }

  populateItems(){
  	let item0 = new ItemListingComponent();
  	item0.name = 'Vacuum Cleaner';
  	item0.rating = 4.4;
  	item0.person_name = 'Swetha';
  	item0.credit = 25;
    item0.image_url = "../../assets/imgs/vacuum.jpg";

  	let item1 = new ItemListingComponent();
  	item1.name = 'Portable Grill';
  	item1.rating = 4.4;
  	item1.person_name = 'Swetha';
  	item1.credit = 20;
    item1.image_url = "../../assets/imgs/grill.jpg";

  	this.items[0] = item0;
  	this.items[1] = item1;
  }
}
