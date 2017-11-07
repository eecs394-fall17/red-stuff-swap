import {Component} from '@angular/core';
import {
  ActionSheetController, IonicPage, LoadingController, NavController, Platform,
  ToastController
} from 'ionic-angular';
import {AngularFireDatabase, AngularFireList} from "angularfire2/database";
import {Camera} from "@ionic-native/camera";
import {Transfer} from "@ionic-native/transfer";
import {FilePath} from "@ionic-native/file-path";
import {File} from "@ionic-native/file";
import * as firebase from "firebase";
import {environment} from "../../environments/environment";

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
  private _lastImage: string = null;
  private _storageBasePath:string = '/uploads';
  private _uploadTask: firebase.storage.UploadTask;
  private _selectedPhoto: any;

  private itemName: string = "";
  private itemDescription: string = "";
  private lendTime: number = 7;
  private itemImgUrl: string = "";
  private credit: number = 10;

  constructor(private db: AngularFireDatabase, private navCtrl: NavController, private camera: Camera,
              private transfer: Transfer, private file: File, private filePath: FilePath,
              private actionSheetCtrl: ActionSheetController, private toastCtrl: ToastController,
              private platform: Platform, private loadingCtrl: LoadingController) {
    this._itemRef = this.db.list('/item');
    firebase.initializeApp(environment.firebase);
  }

  addItem() {
    this._itemRef.push({
      credit: this.credit,
      // todo wrong url
      image_url: this.itemImgUrl,
      name: this.itemName,
      rating: 0,
      reviews_num: 0,
      status: "on_shell",
      time_created: Date.now(),
      time_range: this.lendTime,
      description: this.itemDescription,
      // todo change these after user system is done
      email: "swethaviswanatha2018@u.northwestern.edu",
      person_name: "Swetha",
      // todo this should not be here
      radius: 2
    });
    this.navCtrl.pop();
  }

  private uploadImage(){
  }

  private dataURItoBlob(dataURI) {
    // code adapted from: http://stackoverflow.com/questions/33486352/cant-upload-image-to-aws-s3-from-ionic-camera
    let binary = atob(dataURI.split(',')[1]);
    let array = [];
    for (let i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {type: 'image/jpeg'});
  };

  pickImage() {
    // if(this.itemImgUrl != ""){
    //   this.itemImgUrl = "";
    // }else{
    //   this.itemImgUrl = "https://firebasestorage.googleapis.com/v0/b/red-stuff-swap.appspot.com/o/Mattel-Games-Pictionary-For-Kids2.jpg?alt=media&token=ee38ea11-ee6d-483b-84a2-93c256dc8a38";
    // }

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
      correctOrientation: true
    };
    let self = this;

    // todo this works!
    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => {
      // Special handling for Android library
      let correctPath, currentName;
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        // android
        // this.filePath.resolveNativePath(imagePath)
        //   .then(filePath => {
        correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
        // this.itemDescription = `currentName: ${currentName}\ncorrectPath: ${correctPath}`;
        self.copyFileToLocalDir(correctPath, currentName, NewItemPage.createFileName());
          // }).catch(error => {
          //   this.presentToast('Failed to resolve path');
        // });
      } else {
        // ios
        currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        // this.itemDescription = `currentName: ${currentName}\ncorrectPath: ${correctPath}`;
        self.copyFileToLocalDir(correctPath, currentName, NewItemPage.createFileName());
      }

      // this._lastImage = currentName;
      // this.itemImgUrl = `${correctPath}${currentName}`;
      // this.itemDescription = `itemImgUrl: ${this.itemImgUrl}`;
    }, (err) => {
      this.presentToast('Error while selecting image.');
    });

    // todo here's what do not work
    // this.camera.getPicture(options).then(imagePath=>{
    //   // const currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
    //   // const correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
    //   // this.copyFileToLocalDir(correctPath, currentName, NewItemPage.createFileName());
    //   this.itemDescription = `${imagePath}`;
    //   const image  = `data:image/jpeg;base64,${imagePath}`;
    //   this.presentToast(`get image`);
    //   const pictures = storage().ref('pictures');
    //   this.presentToast(`get pictures ref`);
    //   pictures.putString(image, `data_url`).then(success=>{
    //     this.itemDescription=`succeed?`;
    //   }, error=>{
    //     this.itemDescription = `failed?`;
    //   }).catch(error=>{
    //     this.itemDescription = `failed!`;
    //   });
    // });
  }

  // Create a new name for the image
  private static createFileName() {
    let d = new Date(),
      n = d.getTime();
    return n + ".jpg";
  }

  // Copy the image to a local folder
  private copyFileToLocalDir(namePath, currentName, newFileName) {
    this.platform.ready().then(()=>{
      // this.presentToast(`Copy File, dataDirectory: ${this.file.dataDirectory}`);
      // this.itemDescription = `currentName: ${currentName}\nnamePath: ${namePath}\nnewFileName: ${newFileName}\ndataDirectory: ${this.file.dataDirectory}`;
      // this.presentToast('Info Displayed');
      this.file.copyFile(namePath, currentName, this.file.dataDirectory, newFileName).then(success => {
        // this.itemDescription = `copy file succeed`;
        // this.presentToast('copy file succeed');
        this._lastImage = newFileName;
        this.itemImgUrl = this.pathForImage(newFileName);
      }, error => {
        // this.itemDescription = `copy file failed`;
        this.presentToast('Error while storing file.');
      });
    });
  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  // Always get the accurate path to your apps folder
  private pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      return this.file.dataDirectory + img;
    }
  }
}
