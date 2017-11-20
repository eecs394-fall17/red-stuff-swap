import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemDetailPage } from './item-detail';
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [
    ItemDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ItemDetailPage),
    ComponentsModule
  ]
})
export class ItemDetailPageModule {}
