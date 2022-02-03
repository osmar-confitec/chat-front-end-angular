export default  class  PageResponse<T>
{

  items:Array<T> = [];

  page:number = 1;

  pageSize:number  = 0;

  totalItens:number = 0;

  totalPages:number = 0;

}
