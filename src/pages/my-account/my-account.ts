import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Platform, App } from 'ionic-angular';
import { UserService } from "../../providers/user-service/user-service";

/**
 * Generated class for the MyAccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-account',
  templateUrl: 'my-account.html',
})
export class MyAccountPage {
  users: any;
  isUserInfoEditorVisible: boolean = false;

  myItemsRoot = "MyItemsPage";
  activityRoot = "ActivityPage";
  activityNumber = 5;

  private unregisterBackAction: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private user: UserService,
    private toastCtrl: ToastController, platform: Platform, app: App) {
    platform.ready().then(() => {
      if (platform.is(`android`)) {
        this.unregisterBackAction = platform.registerBackButtonAction(() => {
          this.goToItemList();
        })
      }
    });
  }

  ionViewWillLeave() {
    // Unregister the custom back button action for this page
    this.unregisterBackAction && this.unregisterBackAction();
  }

  ngOnInit() {
    this.users = this.user.getUsers();
  }

  goToItemList() {
    this.navCtrl.pop({ animate: true, direction: 'forward' });
  }

  getActivityNumber() {
    return this.activityNumber;
  }

  switchUser() {
    if (!this.isUserInfoEditorVisible) {
      this.user.switchUser();
      this.presentToast(`Current user is: ${this.user.getCurrentUser().user_name}`);
    }
  }

  switchUserEditor() {
    this.presentToast(`event triggered`);
    this.isUserInfoEditorVisible = true;
  }

  applyUserInfo() {
    this.user.changeUserInfo(this.users);
    this.isUserInfoEditorVisible = false;
    this.presentToast(`Current user is: ${this.user.getCurrentUser().user_name}`);
  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

}
