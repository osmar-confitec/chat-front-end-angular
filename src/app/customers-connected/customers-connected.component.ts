import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import Customer from '../models/customer';
import SendMessageCustomerViewModel from '../models/sendMessageCustomerViewModel';
import { ChatSignalrService } from '../services/chat-signalr.service';

@Component({
  selector: 'app-customers-connected',
  templateUrl: './customers-connected.component.html',
  styleUrls: ['./customers-connected.component.css']
})
export class CustomersConnectedComponent implements OnInit {


  @Input()
  public customer:Customer| undefined;

  @Input()
  public customerWhoWillSend:Customer| undefined;


  @ViewChild('textArea') private textArea: ElementRef | undefined;

  constructor(private chatSignalrService:ChatSignalrService,private renderer: Renderer2) { }

async  enviarMensagem()
  {
      let messageCustomer = new SendMessageCustomerViewModel();
      messageCustomer.message = this.textArea?.nativeElement.value ?? '';
      messageCustomer.customerId = this.customer?.id ?? '';
      messageCustomer.customerSendId = this.customerWhoWillSend ?? new Customer();
      await this.chatSignalrService.sendMessageCustomer(messageCustomer);
      this.renderer.setProperty(this.textArea?.nativeElement, 'innerHTML', '');
      
  }

  ngOnInit(): void {
  }



}
