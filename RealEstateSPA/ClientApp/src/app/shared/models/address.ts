import { City } from "./city";

export class Address
{
    addressId: number;
    number: number;
    street : string;
    unitNumber : number;
    intersection : string;
    postalCode:string;
    cityId:number;
    city: City;
}