import { HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

export abstract  class BaseService {

  protected url: string = environment.api;
  protected controller:string = '';

  protected abstract getController():string;
  protected getUrl():string
  {
        return   this.url+this.controller;
  }


  protected async ExecuteAsync<TModel>(
    { func, loading, fullscreen }: { func: Observable<TModel>; loading?: boolean; fullscreen?: boolean; }): Promise<TModel> {
    const content = await func.toPromise();
    return content;
  }

  


  protected GetHeaderJson() {
    return {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };
}
  constructor() {this.controller = this.getController(); }
}
