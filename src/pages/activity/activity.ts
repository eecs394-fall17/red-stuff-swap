import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { OrderService } from "../../providers/order-service/order-service";

@IonicPage()
@Component({
  selector: 'page-activity',
  templateUrl: 'activity.html',
})
export class ActivityPage {

  private _requests = [];

  constructor(private orderServ: OrderService) {

  }

  ngOnInit(){
    this.orderServ.requests$.subscribe(requests => {
      if(requests){
        this._requests = requests;
      }
    })
  }

}
