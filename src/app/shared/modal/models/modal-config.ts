export interface ModalConfig {
  modalTitle: string
  dismissButtonLabel?: string
  closeButtonLabel?: string
  shouldClose(): Promise<boolean> | boolean
  shouldDismiss(): Promise<boolean> | boolean
  onClose(): Promise<boolean> | boolean
  onDismiss(): Promise<boolean> | boolean
  disableCloseButton(): boolean
  disableDismissButton(): boolean
  hideCloseButton(): boolean
  hideDismissButton(): boolean
  showButtonClose:boolean;
}


export class ModalConfigClass implements ModalConfig
{
  showButtonClose: boolean = false;
  shouldClose(): boolean | Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  shouldDismiss(): boolean | Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  onClose(): boolean | Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  onDismiss(): boolean | Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  disableCloseButton(): boolean {
    return true;
  }
  disableDismissButton(): boolean {
    return true
  }
  hideCloseButton(): boolean {
    return true;
  }
  hideDismissButton(): boolean {
    return true
  }
  modalTitle: string = '';
  dismissButtonLabel?: string | undefined;
  closeButtonLabel?: string | undefined;
}
