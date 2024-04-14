import { Injectable } from '@angular/core';
import {catchError, Observable} from "rxjs";
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';

import {Package, PackageArray} from "./package"
import {Hotel} from "./hotel";
import {Flight} from "./flight";
import {PackageDetails} from "./packageDetails";
import {Booking, BookingArray} from "./booking";

@Injectable({
 providedIn: 'root'
})
export class PackageService {
 constructor(private http: HttpClient) { }
  getPackagesAPI(): Observable<PackageArray> {
   return this.http.get('http://127.0.0.1:8000/travels/packages/') as Observable<PackageArray>;
  }

  getBookings(): Observable<BookingArray>{
   return this.http.get('http://localhost:8000/bookings/booking') as Observable<BookingArray>;
  }
  // getBooking(${id}) : Booking{
  // return this.http.get('http://localhost:8000/bookings/booking/') as Observable<BookingArray>;
  // }
  deleteBooking(id : number){
   this.http.delete(`http://localhost:8000/bookings/booking/${id}`).subscribe(value => {
     console.log(`Deleted booking : `, value)
   })
  }
  signup(username : string,email : string,pass1 : string, pass2 : string){

   const body = {
      username : username,
     email : email,
      password1 : pass1,
      password2 : pass2
    }

    console.log(body)
    this.http.post('http://127.0.0.1:8000/signup/',body).subscribe(value => {

        let user = JSON.parse(value.toString())
        localStorage.setItem("user_first",user.first_name)
        localStorage.setItem("user_last",user.last_name)
        // localStorage.setItem("user",user.first_name)
        // console.log(a)
      }
    );
  }

  login(username : string, password : string){

   const body = {
      username : username,
      password : password
    }

    this.http.post('http://127.0.0.1:8000/login/',body,{responseType: 'text'}).subscribe(
      value => {
        // if(value === "Success") {
          localStorage.setItem('currentUser', username)
        // }
      }
    );
  }


  addFlight(packageName : string, flight : Flight){

   console.log(flight)
    let iso_arrival= new Date(flight.arrival_time).toISOString()
    let iso_departure= new Date(flight.departure_time).toISOString()
     flight.arrival_time= iso_arrival
     flight.departure_time = iso_departure

    let body = `{
      "flight": {
        "name": "${flight.name}",
        "departure_location": "${flight.departure_location}",
        "arrival_location": "${flight.arrival_location}",
        "departure_time": "${flight.departure_time}",
        "arrival_time": "${flight.arrival_time}",
        "price": ${flight.price}
    }
    }`
    this.http.patch(`http://127.0.0.1:8000/travels/packages/${packageName}/`,JSON.parse(body)).subscribe();
  }


  addBooking(firstName : string, lastName: string, email : string, packageName : string){
   let message = "test message"
    let body = {
     first_name : firstName,
      last_name : lastName,
      email : email,
      message : message,
      packageName : packageName
    }
    console.log(body)
    this.http.post('http://127.0.0.1:8000/bookings/booking/create',body).subscribe()
  }

  //Modify the hotel back end using a PATCH call
  addHotel(packageName : string, hotel : Hotel){

    let body = `{
      "hotel": {
        "name": "${hotel.name}",
        "address": "${hotel.address}",
        "room_type": "${hotel.room_type}",
        "price": ${hotel.price},
        "description": "${hotel.description}"
        }
    }`

   console.log(body)
    this.http.patch(`http://127.0.0.1:8000/travels/packages/${packageName}/`,JSON.parse(body)).subscribe();
  }

  //Delete the package, make sure to refresh the page after !
deletePackage(packageName: string){
   console.log(`deleting package ${packageName}`)
   this.http.delete(`http://127.0.0.1:8000/travels/packages/${packageName}/`).subscribe(
     value => {
       window.location.reload()
     }
   )
}

addPackageDetails(packageName : string, details : PackageDetails){

    let body = `{
      "_package": {
        "country": "${details.country}",
        "rating": "${details.rating}",
        "image_path": "${details.image_path}",
        "price": ${details.price},
        "amenities": "${details.amenities}"
        }
    }`

   console.log(body)
    this.http.patch(`http://127.0.0.1:8000/travels/packages/${packageName}/`,JSON.parse(body)).subscribe();
  }

  createBasePackage(name : String){

     let postBody = ` {
     "hotel" : {},
     "flight" : {},
     "_package" : {},
     "name" : "${name}"
    }`
    this.http.post('http://127.0.0.1:8000/travels/packages/',JSON.parse(postBody)).subscribe();
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
        "price": ${flight.price}
    },
    "_package" : {
    "country": "${_package.country}",
    "price": ${_package.price},
    "rating": ${_package.rating},
    "amenities": "${_package.amenities}",
    "image_path": "${_package.image_path}"
    }
    }`

    this.http.post('http://127.0.0.1:8000/travels/packages/',JSON.parse(postBody)).subscribe();
  }
}
