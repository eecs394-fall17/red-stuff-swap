import { NgModule } from '@angular/core';
import { ItemListingComponent } from './item-listing/item-listing';
import {IonicModule} from "ionic-angular";
import { ActivityItemComponent } from './activity-item/activity-item';
@NgModule({
	declarations: [ItemListingComponent,
    ActivityItemComponent],
	imports: [IonicModule],
	exports: [ItemListingComponent,
    ActivityItemComponent]
})
export class ComponentsModule {}
