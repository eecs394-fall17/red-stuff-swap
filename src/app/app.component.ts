import { Component } from '@angular/core';
import {App, NavController, Platform, ToastController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {environment} from "../environments/environment";
import * as firebase from "firebase";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = 'HomePage';

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
              private app: App, private toastCtrl: ToastController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  addNewItem(){
    this.app.getRootNav().push("NewItemPage");
  }

  showProfile(){
    this.presentToast(`This function is still under development.`);
  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
}
