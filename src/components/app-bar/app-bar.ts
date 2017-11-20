import { Component } from '@angular/core';
import { App } from "ionic-angular";

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

  constructor(private app: App) {
  }

  addNewItem(){
    this.app.getRootNav().push("NewItemPage");
  }

  showProfile(){
    this.app.getRootNav().push("MyAccountPage", {},{animate: true, direction: 'back'});
  }

}
