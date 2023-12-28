import { Button, Row, Skeleton, Typography } from "antd";
import React, { useEffect, useRef, useState } from "react";
import CartTable from "./components/CartTable";
import { getRecommendedProducts } from "@/apis/product.api";
import { useProductStore } from "@/stores/useProductStore";
import { RecommendedProductCard } from "@/components/RecommendedProductCard";

const CartPage: React.FunctionComponent = () => {
  const { setRecommendedProducts, recommendedProducts } = useProductStore(
    (state) => state
  );

  const [recommendedProductsLoading, setRecommendedProductsLoading] =
    useState<boolean>(false);

  const fetchRecommendedProductData = useRef<any>();

  useEffect(() => {
    fetchRecommendedProductData.current = async () => {
      setRecommendedProductsLoading(true);
      try {
        const { data: recommendedProductData } = await getRecommendedProducts();

        setRecommendedProducts(recommendedProductData);
        setRecommendedProductsLoading(false);
      } catch (error) {
        setRecommendedProductsLoading(false);
        console.log(error);
      }
    };
    fetchRecommendedProductData.current();
    () => fetchRecommendedProductData.current;
  }, []);

  return (
    <div className="py-12 px-80">
      <Typography.Title level={2} style={{ margin: 0 }}>
        Shopping cart
      </Typography.Title>
      <div className="mt-8">
        <CartTable />
      </div>
      <Row className="my-10">
        <h2 className="text-3xl text-neutral-900">Related Products</h2>
        <div className="grid grid-cols-2 gap-6">
          {recommendedProductsLoading ? (
            <>
              <Skeleton className="h-[349px]" />
              <Skeleton className="h-[349px]" />
            </>
          ) : (
            recommendedProducts &&
            recommendedProducts.length > 0 &&
            recommendedProducts
              .slice(4, 6)
              .map((item) => (
                <RecommendedProductCard key={item.id} data={item} />
              ))
          )}
        </div>
      </Row>
    </div>
  );
};

export default CartPage;
