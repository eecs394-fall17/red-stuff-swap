import { Component, Input, Output } from '@angular/core';

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

  @Input('id') id: number;
  @Input('name') name: string;
  @Input('rating') rating: number;
  @Input('person_name') person_name: string;
  @Input('credit') credit: number;
  @Input('radius') radius: number;
  @Input('image_url') image_url: string;
  @Input('time_created') time_created: Date;
  @Input('time_range') time_range: number;
  @Input('status') status: any;

  constructor() {
    
  }

}
