import { Component } from '@angular/core';
import {
  ActionSheetController, IonicPage, LoadingController, NavController, NavParams, Platform, ToastController
} from 'ionic-angular';
import {AngularFireDatabase, AngularFireList} from "angularfire2/database";
import {Camera} from "@ionic-native/camera";
import * as firebase from "firebase";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

/**
 * Generated class for the EditItemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-item',
  templateUrl: 'edit-item.html',
})
export class EditItemPage {

  private _itemRef: AngularFireList<any>;
  private _loader: any;

  developerMode = false;

  private authForm: FormGroup;
  data: any;

  constructor(
    private db:AngularFireDatabase,
    private navCtrl: NavController,
    public navParams: NavParams,
    private camera: Camera,
    private actionSheetCtrl: ActionSheetController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private formBuilder: FormBuilder) {

    this.data = this.navParams.get('data');
    this._itemRef = this.db.list('/item');

    this.authForm = formBuilder.group({
      itemName: [this.data.name, Validators.compose([Validators.required, Validators.maxLength(40)])],
      itemDescription: [this.data.description, Validators.compose([Validators.required, Validators.maxLength(200)])],
      lendTime: [this.data.time_range, Validators.compose([Validators.required])],
      personName: [this.data.person_name],
      personEmail: [this.data.email]
    });
  }

  editItem(value){
    this._itemRef.update(this.data.key, {
      name: value.itemName,
      description: value.itemDescription,
      image_url: this.data.image_url,
      time_range: value.lendTime,
      person_name: value.personName,
      email: value.personEmail
    });
    this.navCtrl.pop();
  }

  private uploadImage(imageData){
    // todo should add user directory
    const images = firebase.storage().ref(`images/${EditItemPage.createFileName()}`);
    images.putString(imageData, 'base64', {contentType: 'image/jpeg'})
      .then(snapshot=>{
        this.data.image_url = snapshot.downloadURL;
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
      quality: 30,
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
