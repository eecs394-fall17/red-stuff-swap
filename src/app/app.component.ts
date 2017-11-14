import { Component } from '@angular/core';
import {App, NavController, Platform, ToastController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {environment} from "../environments/environment";
import * as firebase from "firebase";
import {UserService} from "../providers/user-service/user-service";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = 'HomePage';

  users: any;
  isUserInfoEditorVisible: boolean = false;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
              private app: App, private toastCtrl: ToastController, private user: UserService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  ngOnInit(){
    this.users = this.user.getUsers();
  }

  addNewItem(){
    this.app.getRootNav().push("NewItemPage");
  }

  showProfile(){
    // which is now switchUser()!
    // this.presentToast(`This function is still under development.`);
    if(!this.isUserInfoEditorVisible){
      this.user.switchUser();
      this.presentToast(`Current user is: ${this.user.getCurrentUser().user_name}`);
    }
  }

  switchUserEditor(){
    this.isUserInfoEditorVisible = !this.isUserInfoEditorVisible;
  }

  applyUserInfo(){
    this.user.changeUserInfo(this.users);
    this.switchUserEditor();
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
