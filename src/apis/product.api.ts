import httpRequest from "@/services/httpRequest";

export const getAllProducts = () => {
  return httpRequest.get("/products");
};

export const getRecommendedProducts = () => {
  return httpRequest.get("/products/recommended");
};

export const createNewProduct = (data: any) => {
  return httpRequest.post("/products", data);
};

export const getProductById = (productId: string | number) => {
  return httpRequest.get(`/products/${productId}`);
};

export const updateProductById = (productId: string | number, data: any) => {
  return httpRequest.put(`/products/${productId}`, data);
};

export const deleteProductById = (productId: string | number) => {
  return httpRequest.delete(`/products/${productId}`);
};

export const getAllReviews = (productId: string | number) => {
  return httpRequest.get(`/reviews/${productId}`);
};

export const addReview = (data: any) => {
  return httpRequest.post("/reviews", data);
};
