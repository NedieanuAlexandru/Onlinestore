import { UserAddressData } from './userAddressData';

export class UserAccountData{
    id: number;
    username: string;
    password: string;
    city: string;
    userAdress: UserAddressData = new UserAddressData();
    deliveryAdress: UserAddressData  = new UserAddressData();
    logotype: string;
    roletype: string = "USER";
}