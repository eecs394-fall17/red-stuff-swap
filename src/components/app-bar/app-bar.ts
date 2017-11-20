import { Component } from '@angular/core';
import { App } from "ionic-angular";
import { OrderService } from "../../providers/order-service/order-service";

/**
 * Generated class for the AppBarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'app-bar',
  templateUrl: 'app-bar.html'
})
export class AppBarComponent {

  private newMsg;

  constructor(private app: App, private orderServ: OrderService) {
  }

  ngOnInit(){
    this.orderServ.newMsgNum$.subscribe(num => {
      this.newMsg = num;
    })
  }

  addNewItem(){
    this.app.getRootNav().push("NewItemPage");
  }

  showProfile(){
    this.app.getRootNav().push("MyAccountPage", {},{animate: true, direction: 'back'});
  }

}
