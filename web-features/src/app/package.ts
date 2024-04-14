import {Hotel} from "./hotel";
import {Flight} from "./flight";
import {PackageDetails} from "./packageDetails";
import {Booking} from "./booking";

export interface Package {
  name : String
  _package : PackageDetails
  hotel : Hotel,
  flight : Flight,
  booking : Booking,
  id : number
}

export interface PackageArray extends Array<Package> { }
