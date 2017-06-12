import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable, AuthProviders, AuthMethods } from 'angularfire2';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
/*it is needed as Observable don't implemnt automatically it*/

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  photoURL;
  displayName: String;

  constructor(private af: AngularFire){
  }

  ngOnInit() {
    this.af.auth.subscribe(authState => {
      if(!authState){
        console.log("Not Logged in !!");
        this.displayName = null;
        this.photoURL = null;
        return;
      }
        console.log("Logged in !!");
        this.displayName = authState.auth.displayName;
        this.photoURL = authState.auth.photoURL;
      
    });
  }

  login(){
    this.af.auth.login({
      provider: AuthProviders.Facebook,
      method: AuthMethods.Popup
    }).then( authState => {
      console.log("After Login: ", authState);
    });
  }

  logout(){
    this.af.auth.logout();
  }

}
