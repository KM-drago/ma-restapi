export interface CardPayment {
  readonly cardHolderName: string;
  readonly ccNo: string;
  readonly amount: string;
  readonly cvc: string;
  readonly itemList: ItemDto[];
  readonly buyerUsername: string;
}

export interface ItemDto {
  readonly id: string;
  readonly name: string;
  readonly price: string;
  readonly qty: number;
}
