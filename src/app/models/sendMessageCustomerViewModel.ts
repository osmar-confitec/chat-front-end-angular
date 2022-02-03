import Customer from "./customer"

export default class SendMessageCustomerViewModel
{
    message:string = ''
    customerId:string  = ''
    customerSendId:Customer = new Customer()
}