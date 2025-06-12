import { orderquantity } from "./OrderQuantity.model";

export interface orderDetails {
    fullName:string;
    contactNumber:string;
    fullAdrress:string;
    alternatNumber:string;
    transactionId: string;
    orderProductQuantityList: orderquantity[];
}


