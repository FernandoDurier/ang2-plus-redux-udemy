import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
/*it is needed as Observable don't implemnt automatically it*/

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  cuisines: FirebaseListObservable<any[]>;
  restaurants: Observable<any[]>;
  exists;

  constructor(private af: AngularFire){
  }

  ngOnInit() {

    this.cuisines = this.af.database.list('/cuisines', {
      query:{/*different from normal SQL databases we can't sort multiple attributes*/
        orderByValue: true
      }
    });

    this.restaurants = this.af.database.list('/restaurants', {
      query:{
        orderByChild:'rating',
        startAt: 3,
        limitToLast: 50
        /*by using limitToLast we show only the last 50 results to user*/
        /*to filter any attribute it is necessary to order the objects by it firstly*/
        //orderByChild:'address/city' /*ordering by grandchild*/
      }
    })
      .map(restaurants => { //modidfying data in runtime
        restaurants.map(restaurant => { //adding the cuisine type to the restaurant object to display easily in browser
          restaurant.featureTypes = [];
          for (var f in restaurant.features){
            restaurant.featureTypes.push(
              this.af.database.object('/features/'+f)
            );
          }
        });
        return restaurants;
      });

      //checking if /restaurants/1/features/1 has an object or not
      this.exists = this.af.database.object('/restaurants/1/features/1');

      //subscribing to the observable in order to see its existence
      this.exists /*the take effect could be done by using unsubscribe*/
      .take(1) /* this is how we are going to take just the first change in the attribute*/
      .subscribe( x => {
        if(x && x.$value){ /*Now it is receiveing constant changes, if we weren't using that take() method*/
          console.log("Exists !!");
        }
        else{
          console.log("Doesn't Exist !!");
        }
      });

      this.af.database.list('/restaurants').push( {name:''} )
        .then( x => {
          let restaurant = {name:'My New Restaurant'};
          let update = {};

          /* //this is updating the nodes of given location to the new restaurant
          update['restaurants/' + x.key] = restaurant; //here we are adding a new restaurant
          update['restaurants-by-city/camberwell/' + x.key] = restaurant; //here we are telling that this resturant is localized at camberwell
          */
          /*in case of deletion*/
          update['restaurants/' + x.key] = null; //here we are adding a new restaurant
          update['restaurants-by-city/camberwell/' + x.key] = null; //here we are telling that this resturant is localized at camberwell

          this.af.database.object('/').update(update);
        });

  }
}
