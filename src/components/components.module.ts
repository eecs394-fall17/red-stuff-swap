import { NgModule } from '@angular/core';
import { ItemListingComponent } from './item-listing/item-listing';
import {IonicModule} from "ionic-angular";
import { ActivityItemComponent } from './activity-item/activity-item';
import { AppBarComponent } from './app-bar/app-bar';
import { LenderInfoComponent } from './lender-info/lender-info';
@NgModule({
	declarations: [ItemListingComponent,
    ActivityItemComponent,
    AppBarComponent,
    LenderInfoComponent],
	imports: [IonicModule],
	exports: [ItemListingComponent,
    ActivityItemComponent,
    AppBarComponent,
    LenderInfoComponent]
})
export class ComponentsModule {}
