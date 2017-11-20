import { NgModule } from '@angular/core';
import { ItemListingComponent } from './item-listing/item-listing';
import {IonicModule} from "ionic-angular";
import { ActivityItemComponent } from './activity-item/activity-item';
import { AppBarComponent } from './app-bar/app-bar';
@NgModule({
	declarations: [ItemListingComponent,
    ActivityItemComponent,
    AppBarComponent],
	imports: [IonicModule],
	exports: [ItemListingComponent,
    ActivityItemComponent,
    AppBarComponent]
})
export class ComponentsModule {}
