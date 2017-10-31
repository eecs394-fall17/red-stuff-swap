import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {HomePage} from "./home";
import {ItemListingModule} from "../../components/item-listing/item-listing.module";

@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    ItemListingModule
  ]
})
export class HomePageModule {}
