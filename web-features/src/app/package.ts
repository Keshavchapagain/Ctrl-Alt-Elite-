import {Hotel} from "./hotel";
import {Flight} from "./flight";
import {PackageDetails} from "./packageDetails";

export interface Package {
  name : String
  _package : PackageDetails
  hotel : Hotel,
  flight : Flight
}

export interface PackageArray extends Array<Package> { }
