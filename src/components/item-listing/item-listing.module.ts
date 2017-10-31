import { NgModule } from '@angular/core';
import {IonicModule} from 'ionic-angular';
import {ItemListingComponent} from "./item-listing";

@NgModule({
  declarations: [
    ItemListingComponent,
  ],
  imports: [
    IonicModule
  ],
  exports: [
    ItemListingComponent
  ]
})
export class ItemListingModule {}
