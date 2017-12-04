import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from "rxjs/BehaviorSubject";

/*
 Generated class for the UserService provider.

 See https://angular.io/guide/dependency-injection for more info on providers
 and Angular DI.
 */
@Injectable()
export class UserService {

  private _userA = {user_id: 0, user_name: 'Donnie River', user_email: 'donnieriver@gmail.com'};
  private _userB = {user_id: 1, user_name: 'Annie Curtis', user_email: 'acurtis@user.mail.com'};
  private _currentUser: any;

  private _userSource = new BehaviorSubject<any>(null);
  currentUser = this._userSource.asObservable();

  constructor() {
    this._currentUser = this._userA;
    this._userSource.next(this._currentUser);
  }

  public switchUser(){
    this._currentUser = this._currentUser == this._userA ? this._userB:this._userA;
    this._userSource.next(this._currentUser);
  }

  // everyone want to use a true email address to test with
  public changeUserInfo(data){
    this._userA = data.userA;
    this._userB = data.userB;
  }

  public refreshCurrentUser(){
    this._userSource.next(this._currentUser);
  }

  public getCurrentUser(){
    return this._currentUser;
  }

  public getUsers(){
    return {userA: this._userA, userB: this._userB};
  }

  public getUserById(id){
    if(id == 0){
      return this._userA;
    }else if(id == 1){
      return this._userB;
    }else{
      return null;
    }
  }
}
