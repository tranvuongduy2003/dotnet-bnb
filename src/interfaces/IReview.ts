export interface IReview {
  id: number | string;
  userId: number | string;
  content: string;
  rating: number;
  avatar: string;
  fullname: string;
  productId: number | string;
  createdAt: string | Date;
  updatedAt: string | Date;
}
export interface IRatingPoint {
  level: number;
  percents: string;
}
