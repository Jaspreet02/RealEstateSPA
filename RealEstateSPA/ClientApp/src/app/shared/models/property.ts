import { Address } from "./address";
import { User } from "./user";

export class Property
{
    propertyId: number;
    description: string;
    addressId : number;
    typeId : number;
    userId : number;
    status:boolean;
    rent:number;
    room:number;
    address:Address;
    user: User;
}