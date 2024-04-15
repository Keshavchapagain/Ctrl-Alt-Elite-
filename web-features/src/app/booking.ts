export interface Booking {
  first_name : string,
  last_name : string,
  email : string,
  message : string,
  package : number,
  id : number,
  zip_code : string,
  city : string,
  cost : number
}

export interface BookingArray extends Array<Booking> { }
