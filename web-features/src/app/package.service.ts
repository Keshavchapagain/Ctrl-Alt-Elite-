import { Injectable } from '@angular/core';
import {catchError, Observable} from "rxjs";
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';

import {Package, PackageArray} from "./package"
import {Hotel} from "./hotel";
import {Flight} from "./flight";
import {PackageDetails} from "./packageDetails";
@Injectable({
 providedIn: 'root'
})
export class PackageService {
 constructor(private http: HttpClient) { }
  getPackagesAPI(): Observable<PackageArray> {
   return this.http.get('http://127.0.0.1:8000/api/v1/packages/') as Observable<PackageArray>;
  }
  addHotel(packageName : string){
  // let body =
   // return this.http.post('http://127.0.0.1:8000/api/v1/packages/') as Observable<PackageArray>;

  }
  addFlight(packageName : string, flight : Flight){

   console.log(flight)
    let iso_arrival= new Date(flight.arrival_time).toISOString()
    let iso_departure= new Date(flight.departure_time).toISOString()
     flight.arrival_time= iso_arrival
     flight.departure_time = iso_departure

    let body = `{
      "name" : "test",
      "rating" : 10,
      "flight": {
        "name": "${flight.name}",
        "departure_location": "${flight.departure_location  }",
        "arrival_location": "${flight.arrival_location}",
        "departure_time": "${flight.departure_time}",
        "arrival_time": "${flight.arrival_time}",
        "price": 1000.0
    }
    }`
    this.http.post('http://127.0.0.1:8000/package/',JSON.parse(body)).subscribe();

  }
   createPackage(hotel : Hotel,flight : Flight, _package : PackageDetails){

    /*
    Convert the dates to ISO formatted dates, or else a 404 will be thrown by django
     */
    let iso_arrival= new Date(flight.arrival_time).toISOString()
    let iso_departure= new Date(flight.departure_time).toISOString()
     flight.arrival_time= iso_arrival
     flight.departure_time = iso_departure

     // TODO : Find a better way to do this, preferably by directly using the object
     let postBody = ` {
        "hotel": {
        "name": "${hotel.name}",
        "address": "${hotel.address}",
        "room_type": "Single Room",
        "price": ${hotel.price},
        "description": "${hotel.description}"
    },
    "flight": {
        "name": "${flight.name}",
        "departure_location": "${flight.departure_location  }",
        "arrival_location": "${flight.arrival_location}",
        "departure_time": "${flight.departure_time}",
        "arrival_time": "${flight.arrival_time}",
        "price": 1000.0
    },
    "_package" : {
    "country": "${_package.country}",
    "price": ${_package.price},
    "rating": ${_package.rating},
    "amenities": "${_package.amenities}",
    "image_path": "${_package.image_path}"
    }
    }`

    this.http.post('http://127.0.0.1:8000/api/v1/packages/',JSON.parse(postBody)).subscribe();
  }
}
