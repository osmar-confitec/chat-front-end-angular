import { Component, Injectable, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModalConfig, ModalConfigClass } from './models/modal-config';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
@Injectable()
export class ModalComponent implements OnInit {

  @Input() public modalConfig: ModalConfig | undefined ;
  @ViewChild('modals') public modalContent: TemplateRef<ModalComponent> | undefined
  private modalRef: NgbModalRef | undefined;

  @Input() ngbModalOptions: NgbModalOptions = {
    windowClass: 'custom-modal',
    centered   : true
  };

  constructor(private modalService: NgbModal) {
    this.modalConfig = new ModalConfigClass();

   }

  ngOnInit(): void { }

  open(): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      this.modalRef = this.modalService.open(this.modalContent,this.ngbModalOptions)
      this.modalRef.result.then(resolve, resolve)
    })
  }


  close(): void {
      this.modalRef?.close()
  }

}
