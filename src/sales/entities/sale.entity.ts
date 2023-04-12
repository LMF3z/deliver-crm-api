export class Sale {
  id: number;
  id_company: number;
  // * seller
  id_user: number;
  id_subsidiary: number;
  id_client: number;
  id_order: number;

  sale_code: string;

  // * dollars
  total_payment: number;

  rate_dollars: number;
  // * (total_payment * rate_dollars) = total_payment_bolivares
  total_payment_bolivares: number;

  type_payment: TypePaymentsT;

  // * if type_payment = transfer && reference_code
  reference_code: string | null;

  change: number;

  is_cancel: boolean;
}

export type TypePaymentsT = 'TRANSFER' | 'MOBILE_PAYMENT' | 'CASH' | 'MIXED';
export enum TypePaymentsE {
  transfer = 'TRANSFER',
  mobile_payment = 'MOBILE_PAYMENT',
  cash = 'CASH',
  mixed = 'MIXED',
}
