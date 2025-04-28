export class CreateVoucherDto {
  folio: string;
  
  departamentRequested: string;
  
  nameRequested: string;
  
  pdf: string;
  
  products: {
    id: string;
    quantity: number;
  }[];

  expirationDate: Date;
  
  status: string;
  
  dateCreated: Date;

}
  