export interface IStatistics {
  totalProducts: number;
  totalCustomer: number;
  totalOrder: TotalOrder[];
  totalProfit: TotalProfit[];
}

export interface TotalOrder {
  date: string;
  totalOrders: number;
}

export interface TotalProfit {
  date: string;
  revenue: number;
  profit: number;
}
