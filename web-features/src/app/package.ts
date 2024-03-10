import {Hotel} from "./hotel";
import {Flight} from "./flight";
import {PackageDetails} from "./packageDetails";

export interface Package {
  _package : PackageDetails
  hotel : Hotel,
  flight : Flight
}

export interface PackageArray extends Array<Package> { }
