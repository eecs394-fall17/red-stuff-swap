import { Component, Input } from '@angular/core';
import { EmailComposer } from "@ionic-native/email-composer";


/**
 * Generated class for the LenderInfoComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'lender-info',
  templateUrl: 'lender-info.html'
})
export class LenderInfoComponent {

	@Input('person_name') person_name: string;
	@Input('email') email: string;
	@Input('isOwner') isOwner: boolean;

	user_rating: number = 4;
	stars = ["star", "star", "star", "star", "star"];


  constructor(private emailComposer: EmailComposer) {
  	this.makeStars();
  }

  makeStars() {
  	let counter = 0;
    for(let i = 0; i < Math.floor(this.user_rating); i++){
      this.stars[counter] = "star";
      counter++;
    }
    if(this.user_rating - counter >= 0.5){
      this.stars[counter] = "star-half";
    }else{
      this.stars[counter] = "star-outline";
    }
    counter++;
    for(let i = 0; i < 4 - Math.floor(this.user_rating); i++){
      this.stars[counter] = "star-outline";
      counter++;
    }
  }

  contactLender(){
    if(this.isOwner) return;
    this.emailComposer.open({to: this.email, isHtml: true});
  }
}
