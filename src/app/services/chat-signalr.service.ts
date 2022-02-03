import { EventEmitter, Injectable, OnInit, Output } from '@angular/core';
import * as signalR from '@microsoft/signalr'; 

import { environment } from 'src/environments/environment';  
import Customer from '../models/customer';
import SendMessageCustomerViewModel from '../models/sendMessageCustomerViewModel';

@Injectable({
  providedIn: 'root'
})
export class ChatSignalrService implements OnInit {


  async startConnection()
  {

   if (!this.hubConnection
      )
   {

    this.hubConnection = new signalR.HubConnectionBuilder()  
    .configureLogging(signalR.LogLevel.Information)  
    .withUrl('https://localhost:5001/hubcustomer',
     { 
       accessTokenFactory: () => 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwNDA3ZGI3My1mYzczLTExZWItOGEzOC0wYzI5ZWZmZGZmNDAiLCJlbWFpbCI6Im9zbWFyZ3Y5OUBnbWFpbC5jb20iLCJuYmYiOjE2MzQzMjM0NDksImV4cCI6MTYzNDQwOTg0OSwiaWF0IjoxNjM0MzIzNDQ5LCJpc3MiOiJNeUVudmlyb25tZW50IiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3QifQ.mJrr-_NLtKNKifaX0uI2ucAnoyUvDNz6xkEqpZQIAEk'
     })  
    .build();  
    return this.hubConnection
    .start().then(function () {  
  
      console.log('SignalR Connected!');  
            /**/ 
            //this.hubConnection.invokeTask('addCustomer', '')
        })
        .catch(function (err) {  
          return console.error(err.toString());  
        }); 

   }

  }

  constructor() { 

    

  }

  @Output()
  receiveMessageEv = new EventEmitter<SendMessageCustomerViewModel>();

  @Output()
  receiveMessageNewCustomerEv = new EventEmitter<Customer>();

  @Output()
  allConectedsEv =  new EventEmitter<string[]>();


  hubConnection:signalR.HubConnection | undefined;


  ngOnInit(): void {

  
  }


  async receiveMessageNewCustomer()
  {
    await this.startConnection();
    this.hubConnection?.on('receive-message-new-customer',(message)=>{

      let messageReceiv =  JSON.parse(message) as  Customer
      this.receiveMessageNewCustomerEv.emit(messageReceiv);
      });
  }


  async receiveMessage()
  {
    await this.startConnection();
    this.hubConnection?.on('receive-message',(message)=>{

  
          let messageReceiv =  JSON.parse(message) as  SendMessageCustomerViewModel
          this.receiveMessageEv.emit(messageReceiv);
    });

  }

  async allConecteds()
  {
    await this.startConnection();
    this.hubConnection?.on('allConecteds',(message)=>{
          let arrayConecteds =  message.split('|')  as Array<string>;
          this.allConectedsEv.emit(arrayConecteds);
    });
  }



  async addCustomer(customer:Customer)
  {
    await this.startConnection();
    this.hubConnection?.invoke('addCustomer',JSON.stringify(customer));
  }

  async sendMessageNewCustomer(customer:Customer)
  {
    await this.startConnection();
    this.hubConnection?.invoke('sendMessageNewCustomer',JSON.stringify(customer));
  }

  async sendMessageCustomer(sendMessageCustomerViewModel:SendMessageCustomerViewModel)
  {
    await this.startConnection();
    this.hubConnection?.invoke('sendMessageCustomer',JSON.stringify(sendMessageCustomerViewModel));
  }
}
