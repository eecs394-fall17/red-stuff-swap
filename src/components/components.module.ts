import { NgModule } from '@angular/core';
import { ItemListingComponent } from './item-listing/item-listing';
import {IonicModule} from "ionic-angular";
@NgModule({
	declarations: [ItemListingComponent],
	imports: [IonicModule],
	exports: [ItemListingComponent]
})
export class ComponentsModule {}
