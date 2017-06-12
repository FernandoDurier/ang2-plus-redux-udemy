import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {AngularFireModule} from 'angularfire2'; //app to build easy backend angulars for firebase

import { AppComponent } from './app.component';

export const firebaseConfig = {
    apiKey: "AIzaSyBlhTPhGYGzOQKZ2yxQg4AyLiBcYKbtlyQ",
    authDomain: "pepper-d62d6.firebaseapp.com",
    databaseURL: "https://pepper-d62d6.firebaseio.com",
    projectId: "pepper-d62d6",
    storageBucket: "pepper-d62d6.appspot.com",
    messagingSenderId: "774842307812"
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig) //initialize the firebase
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
