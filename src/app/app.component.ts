import { ThrowStmt } from '@angular/compiler';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { rejects } from 'assert';
import Customer from './models/customer';
import CustomerGetResponse from './models/customerGetResponse';
import SendMessageCustomerViewModel from './models/sendMessageCustomerViewModel';
import { ChatSignalrService } from './services/chat-signalr.service';
import { CustomerService } from './services/customer.service';
import { ModalComponent } from './shared/modal/modal.component';
import { ModalConfigClass } from './shared/modal/models/modal-config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy  {



subscription: any;
subscriptionReceiveMessage:any;
subscriptionreceiveMessageNewCustomer:any;
customers:Customer[] = []
public sendMessageCustomerViewModel:SendMessageCustomerViewModel[] = [];

@ViewChild('modalChat') private modalChat: ModalComponent | undefined;
@ViewChild('inputNameChat') private inputNameChat: ElementRef | undefined;
//inputNameChat

public   modalConfig:ModalConfigClass = new ModalConfigClass();
customer:Customer | undefined;
  
public   ngbModalOptions: NgbModalOptions = {
  windowClass: 'custom-modal',
  centered   : true,
  backdrop:'static',
  size: 'xl'
};
  constructor(private chatSignalrService:ChatSignalrService,
              private customerService:CustomerService){
    
  }
  async enterChat()
  {
       let valueInput =  this.inputNameChat?.nativeElement.value;
       if (valueInput)
       {
        let customer = new Customer();
        customer.name = valueInput;
        let customers =  await this.getCustomers(customer);
        if (customers.customerGetDtos.length>1)
        {
          alert('Atenção especifique o nome corretamente')
          return 
        }
        this.customer = customers.customerGetDtos[0];
        let result =  await this.getCustomersExcept(this.customer.id);
        this.customers = result.customerGetDtos;
       
        this.receiveAllConect();
        await this.chatSignalrService.allConecteds();
        await  this.chatSignalrService.addCustomer(this.customer); 

        this.receiveMessage();
        await this.chatSignalrService.receiveMessage();

        this.receiveMessageNewCustomer();
        await this.chatSignalrService.receiveMessageNewCustomer();



        this.modalChat?.close();
       }else 
       alert('Digite algum valor');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.subscriptionReceiveMessage.unsubscribe();
    this.subscriptionreceiveMessageNewCustomer.unsubscribe();
  }
   async ngAfterViewInit() {
    // this.modalChat?.open();
    await this.modalChat?.open();
  }


   /**/
   async getCustomers(customer:Customer):Promise<CustomerGetResponse> {
    let cust:CustomerGetResponse =  new CustomerGetResponse(); 
    let promisse =  this.customerService.getCustomers(customer).toPromise();
   await promisse.then((res)=>{
      cust = res.data ??new CustomerGetResponse() ;
    },((rej)=>{

      cust = new CustomerGetResponse();
    }));
    return cust;
   }

   async getCustomersExcept(id:string):Promise<CustomerGetResponse> {
    let cust:CustomerGetResponse =  new CustomerGetResponse(); 
    let promisse =  this.customerService.getCustomersExcept(id).toPromise();
   await promisse.then((res)=>{
      cust = res.data ??new CustomerGetResponse() ;
    },((rej)=>{

      cust = new CustomerGetResponse();
    }));
    return cust;
   }

  receiveMessage()
  {

    this.subscriptionReceiveMessage  =  this.chatSignalrService.receiveMessageEv.subscribe((subs:SendMessageCustomerViewModel)=>{

      this.sendMessageCustomerViewModel.push(subs);

    });
  }

  
  receiveMessageNewCustomer()
  {

    this.subscriptionreceiveMessageNewCustomer =  this.chatSignalrService.receiveMessageNewCustomerEv.subscribe((subs:Customer)=>{
      this.customers = [...[],...this.customers];
      this.customers.push(subs);

    });
  }


  /*receiveMessageNewCustomer*/ 

  receiveAllConect()
   {
    this.subscription =  this.chatSignalrService.allConectedsEv.subscribe((subs:Array<string>)=>{
      //debugger;
      //console.log(subs);
          subs.forEach((value,index)=>{

             let idx =  this.customers.findIndex((cus)=> cus.id == value );
             if (idx>=0)
              this.customers[idx] = {...this.customers[idx], online: true}
          });

   });
   
   }
 
   ngOnInit() {
    this.modalConfig.showButtonClose = false;
    
    /*
    
    let result =  await  this.getCustomers(new Customer());
    this.customers = result.customerGetDtos;
    */
    /*buscar conectados*/ 
    /*
   
    await this.chatSignalrService.allConecteds();
    await  this.modalChat?.open();
    */

    /*abrir modal se conectar e retirar da lista*/ 

    // let chat  =  this.chatSignalrService; 
    //await chat.startConnection();
   // let customer:Customer = new Customer();
    //customer.age = 10;
    //customer.name = 'Osmar Gonçalves Vieira';
    //customer.id = '232B39EE-C961-4E03-8B97-81CC2F8CAAA6';
    //await  chat.addCustomer(customer); 

  }
  title = 'chat-angular';
}
