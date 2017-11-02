import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';

/**
 * Generated class for the EmailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-email',
  templateUrl: 'email.html',
})
export class EmailPage {
  emailTitle: string = "";
  emailContent: string = "";
  recipient_email: string;
  recipient_name: string;
  sender_email: string;
  sender_name: string;

  constructor(public navParams: NavParams, private view: ViewController) {
    this.recipient_email = navParams.get("email");
    this.recipient_name = navParams.get("name");
    // todo Update code below when implemented user system
    this.sender_email = 'josiahrupp2018@u.northwestern.edu';
    this.sender_name = 'Josiah';
  }

  closeModal() {
    this.view.dismiss();
  }

  sendEmail(){
    console.log('clicked');
    this.closeModal();
  }
}
