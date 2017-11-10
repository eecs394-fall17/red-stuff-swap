import {Component} from '@angular/core';
import {
  ActionSheetController, IonicPage, LoadingController, NavController, Platform,
  ToastController
} from 'ionic-angular';
import {AngularFireDatabase, AngularFireList} from "angularfire2/database";
import {Camera} from "@ionic-native/camera";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import * as firebase from "firebase";

/**
 * Generated class for the NewItemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-item',
  templateUrl: 'new-item.html',
})
export class NewItemPage {

  private _itemRef: AngularFireList<any>;
  private _loader: any;

  developerMode = false;

  private authForm: FormGroup;
  private itemName: string = "";
  private itemDescription: string = "";
  private lendTime: number = 7;
  private itemImgUrl: string = "";
  private credit: number = 10;

  constructor(private db: AngularFireDatabase, private navCtrl: NavController, private camera: Camera,
              private actionSheetCtrl: ActionSheetController, private toastCtrl: ToastController,
              private loadingCtrl: LoadingController, private formBuilder: FormBuilder) {
    this._itemRef = this.db.list('/item');

    this.authForm = formBuilder.group({
      itemName: ['', Validators.compose([Validators.required, Validators.maxLength(40)])],
      itemDescription: ['', Validators.compose([Validators.required, Validators.maxLength(200)])],
      lendTime: ['7', Validators.compose([Validators.required])],
      personName: ['Swetha'],
      personEmail: ['swethaviswanatha2018@u.northwestern.edu']
    });
  }

  addItem(value) {
    this._itemRef.push({
      credit: 0,
      // todo wrong url
      image_url: this.itemImgUrl,
      name: value.itemName,
      rating: 0,
      reviews_num: 0,
      status: "on_shell",
      time_created: Date.now(),
      time_range: value.lendTime,
      description: value.itemDescription,
      // todo change these after user system is done
      email: value.personEmail,
      person_name: value.personName,
      // todo this should not be here
      radius: 2
    });
    this.navCtrl.pop();
  }

  private uploadImage(imageData){
    // todo should add user directory
    const images = firebase.storage().ref(`images/${NewItemPage.createFileName()}`);
    images.putString(imageData, 'base64', {contentType: 'image/jpeg'})
      .then(snapshot=>{
        this.itemImgUrl = snapshot.downloadURL;
        this._loader.dismiss();
      }).catch(error=>{
      this.presentToast(`error: ${error}`);
    });
  }

  pickImage() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  takePicture(sourceType) {
    // Create options for the Camera Dialog
    let options = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    // Get the data of an image
    this.camera.getPicture(options).then((imageData) => {
      this._loader = this.loadingCtrl.create({content: `Please wait...`});
      this._loader.present();
      this.uploadImage(imageData);
    }, (err) => {
      this.presentToast('Error while selecting image.');
    });
  }

  // Create a new name for the image
  private static createFileName() {
    let d = new Date(),
      n = d.getTime();
    return n + ".jpg";
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
