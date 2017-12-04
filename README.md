# Spare

## Description

Spare is a mobile application build for people who have things left unused and want to reveal their value once again.

Users of the application can:

* Put up their idle items on the app
* Lend items / borrow others' items with a regularized process

## System Requirements

* A current version of Node.js (version above v8.0.0 is recommended)

To install the newest version of Node.js, [Click Here](https://nodejs.org/).

## Installation

#### Install Ionic CLI and Cordova

After making sure Node.js is installed successfully, proceed to install Ionic CLI and Cordova for native app development:

``` bash
$ npm install -g ionic cordova
```

> Maybe you need to add `sudo` in front of the command to install it globally

#### Set up Project

##### Download

Clone this repo to your local drive.

``` bash
$ git clone https://github.com/eecs394-fall17/red-stuff-swap.git
```

##### Set up Firebase

Go to [Firebase](https://firebase.google.com). Login your Google Account and create a Firebase Application.

On dashboard page of application, click wheel gear icon to open setting page.

In `GENERAL` tab, you can get Project ID, Web Api Key, etc.

Open file `src/environments/environments.ts` and replace settings like this:

``` javascript
export const environment = {
  production: false,
  firebase: {
    apiKey: '<Your Web Api Key>',
    authDomain: '<Your Project ID>.firebaseapp.com',
    databaseURL: 'https://<Your Project ID>.firebaseio.com',
    projectId: '<Your Project ID>',
    storageBucket: 'gs://<Your Project ID>.appspot.com',
    messagingSenderId: '<Number in "Public Facing Name">'
  }
};
```

##### Run and Test Application

Run and preview the app for the first time.

``` bash
$ cd red-stuff-swap
$ ionic serve
```

For the first time you run `serve` command, you'll receive a question like this, just answer `Y`.

``` bash
? Looks like a fresh checkout! No ./node_modules directory found. Would you like to install project dependencies? (Y/n) Y
```

This will automatically install npm dependencies for you and help you set up all things to develop our project.

After the installation, the application will start up automatically.

## View the app on Ionic View

To run our app on Ionic View, register a new developer account from [here](https://dashboard.ionicjs.com/login) if you don't have one.

Create a new app by clicking `New App` button.

Follow the instructions in your ionic pro repo.

## Deployment

#### Android

**Prerequisite**: You'll need at least have one version of android SDK build tool, adb and gradle already installed to do this. A fastest way to do this is install a newest version of [Android Studio](https://developer.android.com/studio/index.html).

Build native android app:

``` bash
$ ionic cordova build android
```

Connect your test device to your computer, run the app on the phone.

``` bash
$ ionic cordova run android
```

#### iOS

Build native ios project:

``` bash
$ ionic cordova platform build ios
```

Open file `Spare.xcworkspace` in `platforms/ios/`, run the app on your iOS device through XCode.

## Known Bug

* When Running app on iOS Ionic View, sometimes tap on add item icon in top bar will not call out add new item page.

## License

Copyright 2017 B.Alarcon, S.Wen, J.Fang

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.