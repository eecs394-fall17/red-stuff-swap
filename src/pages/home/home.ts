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
    item0.radius = 2;

  	let item1 = new ItemListingComponent();
  	item1.name = 'Portable Grill';
  	item1.rating = 4.4;
  	item1.person_name = 'Swetha';
  	item1.credit = 20;
    item1.image_url = "../../assets/imgs/grill.jpg";
    item1.radius = 2;

    let item2 = new ItemListingComponent();
    item2.name = 'KitchenAid Mixer';
    item2.rating = 4.0;
    item2.person_name = 'Kelly';
    item2.credit = 10;
    item2.image_url = "../../assets/imgs/grill.jpg";
    item2.radius = 5;

    let item3 = new ItemListingComponent();
    item3.name = 'Pictionary';
    item3.rating = 4.2;
    item3.person_name = 'Swetha';
    item3.credit = 5;
    item3.image_url = "../../assets/imgs/grill.jpg";
    item3.radius = 0.5;

    let item4 = new ItemListingComponent();
    item4.name = 'Dewalt Power Drills';
    item4.rating = 4.0;
    item4.person_name = 'Swetha';
    item4.credit = 20;
    item4.image_url = "../../assets/imgs/grill.jpg";
    item4.radius = 2;

    let item5 = new ItemListingComponent();
    item5.name = 'Gaming Mouse';
    item5.rating = 4.0;
    item5.person_name = 'Swetha';
    item5.credit = 5;
    item5.image_url = "../../assets/imgs/grill.jpg";
    item5.radius = 1;

    let item6 = new ItemListingComponent();
    item6.name = 'Chromecast';
    item6.rating = 3.0;
    item6.person_name = 'Swetha';
    item6.credit = 10;
    item6.image_url = "../../assets/imgs/grill.jpg";
    item6.radius = 5;

  	for(let i=0; i < 7; i++){
      this.items[i] = eval("item"+i);
    }
  }
}
