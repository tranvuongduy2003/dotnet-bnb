export interface IOrder {
  id: number | string;
  status: string;
  userId: number | string;
  receiptAddress: string;
  receiptName: string;
  receiptPhone: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  deletedAt?: string | Date;
  orderItems: OrderItemModel[];
}

export interface OrderItemModel {
  id: number | string;
  quantity: number;
  productId: number | string;
  orderId: number;
  productName: string;
  productImage: string;
  productPrice: number;
  sumPrice: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}
