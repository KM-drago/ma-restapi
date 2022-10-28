export interface MobilePayment {
  readonly mobileNo: string;
  readonly pinNo: string;
  readonly amount: string;
  readonly itemList: ItemDto[];
  readonly buyerUsername: string;
}

export interface ItemDto {
  readonly id: string;
  readonly name: string;
  readonly price: string;
  readonly qty: number;
}
