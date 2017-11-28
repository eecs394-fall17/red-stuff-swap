import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import {AngularFireDatabaseModule, AngularFireDatabase} from "angularfire2/database";
import { AngularFireAuthModule } from 'angularfire2/auth';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {EmailComposer} from "@ionic-native/email-composer";
import {File} from "@ionic-native/file";
import {Camera} from "@ionic-native/camera";
import { CalendarModule } from "ion2-calendar";
import { UserService } from '../providers/user-service/user-service';
import {LongPressModule} from "ionic-long-press";
import {MomentModule} from "angular2-moment";
import { OrderService } from '../providers/order-service/order-service';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    CalendarModule,
    LongPressModule,
    MomentModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    EmailComposer,
    File,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserService,
    OrderService
  ]
})
export class AppModule {}
