import { IProduct } from "@/interfaces/IProduct";
import { useBrandStore } from "@/stores/useBrandStore";
import { useCategoriesStore } from "@/stores/useCategoryStore";
import { useProductStore } from "@/stores/useProductStore";
import { Checkbox, Col, Collapse, InputNumber, Rate, Row, Slider } from "antd";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import React, { useEffect, useState } from "react";
const { Panel } = Collapse;

// interface IFilterBarProps {}

const FilterBar: React.FunctionComponent = () => {
  const products = useProductStore((state) => state.products);
  const setFilteredProducts = useProductStore(
    (state) => state.setFilteredProducts
  );

  // Sort by
  const sortBy = useProductStore((state) => state.sortBy);

  // Price range
  const maxPrice = Math.max(
    ...products.map((item) => JSON.parse(item.price as string))
  );
  const [range, setRange] = useState<[number, number]>([0, 100]);
  const onChange = (value: [number, number]) => {
    setRange(value);
  };
  const onAfterChange = () => {
    setLimit([
      Math.round(range[0] * (maxPrice / 100)),
      Math.round(range[1] * (maxPrice / 100)),
    ]);
  };

  // Category
  const categories = useCategoriesStore((state) => state.categories);
  const categoryOptions = categories.map((item) => ({
    value: item.id,
    label: item.name,
  }));
  const onCategoryChange = (checkedValues: CheckboxValueType[]) => {
    setCategoryValue(checkedValues);
  };

  // Brand
  const brands = useBrandStore((state) => state.brands);
  const brandOptions = brands.map((item) => ({
    value: item.id,
    label: item.name,
  }));
  const onBrandChange = (checkedValues: CheckboxValueType[]) => {
    setBrandValue(checkedValues);
  };

  // Rating
  const ratingOptions = [
    { value: 5 },
    { value: 4 },
    { value: 3 },
    { value: 2 },
    { value: 1 },
  ];
  const onRatingChange = (checkedValues: CheckboxValueType[]) => {
    setRatingValue(checkedValues);
  };

  const [categoryValue, setCategoryValue] = useState<CheckboxValueType[]>(
    categoryOptions.map((item) => item.value)
  );
  const [brandValue, setBrandValue] = useState<CheckboxValueType[]>(
    brandOptions.map((item) => item.value)
  );
  const [ratingValue, setRatingValue] = useState<CheckboxValueType[]>(
    ratingOptions.map((item) => item.value)
  );
  const [limit, setLimit] = useState<[number, number]>([
    Math.round(range[0] * (maxPrice / 100)),
    Math.round(range[1] * (maxPrice / 100)),
  ]);

  useEffect(() => {
    let changedProducts: IProduct[] = [...products];

    changedProducts = changedProducts.filter((item) => {
      const itemPrice = JSON.parse(item.price as string);
      return limit && itemPrice >= limit[0] && itemPrice <= limit[1];
    });

    changedProducts = changedProducts.filter((item) => {
      return categoryValue?.includes(item.categoryId);
    });

    changedProducts = changedProducts.filter((item) => {
      if (brandValue.length === brandOptions.length) return true;
      return brandValue?.includes(item.brandId);
    });

    changedProducts = changedProducts.filter((item) => {
      if (ratingValue.length === ratingOptions.length) return true;
      for (let index = 0; index < ratingValue.length; index++) {
        if (
          item.avgRating <= (ratingValue[index] as number) &&
          item.avgRating > (ratingValue[index] as number) - 1
        ) {
          return true;
        }
      }
      return false;
    });

    switch (sortBy) {
      case "low":
        changedProducts = changedProducts.sort(
          (a, b) =>
            JSON.parse(a.price as string) - JSON.parse(b.price as string)
        );
        break;
      case "high":
        changedProducts = changedProducts.sort(
          (a, b) =>
            JSON.parse(b.price as string) - JSON.parse(a.price as string)
        );
        break;

      case "last":
        changedProducts = changedProducts.sort((a, b) => {
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);
          return dateA.getTime() - dateB.getTime();
        });
        break;

      case "newest":
        changedProducts = changedProducts.sort((a, b) => {
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);
          return dateA.getTime() - dateB.getTime();
        });
        break;

      default:
        break;
    }

    setFilteredProducts(changedProducts);
  }, [products, brands, categoryValue, brandValue, ratingValue, limit, sortBy]);

  return (
    <div className="w-full p-4 rounded-md shadow-md">
      {/* TITLE */}
      <Row
        justify={"space-between"}
        align={"middle"}
        className="border-0 border-b border-solid pb-7 border-neutral-200"
      >
        <Col>
          <span className="text-base">Filters</span>
        </Col>
        <Col>
          <span className="cursor-pointer text-primary-500">Clear all</span>
        </Col>
      </Row>

      {/* PRICE RANGE */}
      <Row className="pb-4 border-0 border-b border-solid pt-7 border-neutral-200">
        <Collapse
          defaultActiveKey={["1"]}
          ghost
          expandIconPosition={"end"}
          className="w-full"
        >
          <Panel
            header="Price range"
            key="1"
            className="p-0 m-0 text-base font-bold"
          >
            <div className="flex items-center justify-between w-full gap-4 font-normal">
              <InputNumber
                value={Math.round(range[0] * (maxPrice / 100))}
                min={0}
                max={maxPrice}
              />
              <span>to</span>
              <InputNumber
                value={Math.round(range[1] * (maxPrice / 100))}
                min={range[0]}
              />
            </div>
            <Slider
              range
              tooltip={{ open: false }}
              value={range}
              onChange={onChange}
              onAfterChange={onAfterChange}
            />
          </Panel>
        </Collapse>
      </Row>

      {/* CATEGORY */}
      <Row className="border-0 border-b border-solid py-7 border-neutral-200">
        <Collapse
          defaultActiveKey={["1"]}
          ghost
          expandIconPosition={"end"}
          className="w-full"
        >
          <Panel
            header="Category"
            key="1"
            className="p-0 m-0 text-base font-bold"
          >
            <Checkbox.Group
              options={categoryOptions}
              onChange={onCategoryChange}
              defaultValue={categoryValue}
              className="flex flex-col gap-2 font-normal"
            />
          </Panel>
        </Collapse>
      </Row>

      {/* BRAND */}
      <Row className="border-0 border-b border-solid py-7 border-neutral-200">
        <Collapse
          defaultActiveKey={["1"]}
          ghost
          expandIconPosition={"end"}
          className="w-full"
        >
          <Panel header="Brand" key="1" className="p-0 m-0 text-base font-bold">
            <Checkbox.Group
              options={brandOptions}
              onChange={onBrandChange}
              defaultValue={brandValue}
              className="flex flex-col gap-2 font-normal"
            />
          </Panel>
        </Collapse>
      </Row>

      {/* RATING */}
      <Row className="py-7">
        <Collapse
          defaultActiveKey={["1"]}
          ghost
          expandIconPosition={"end"}
          className="w-full"
        >
          <Panel
            header="Rating"
            key="1"
            className="p-0 m-0 text-base font-bold"
          >
            <Checkbox.Group
              defaultValue={ratingOptions.map((item) => item.value)}
              onChange={onRatingChange}
              className="flex flex-col gap-2"
            >
              {ratingOptions.map((item, index) => (
                <Checkbox
                  key={index}
                  value={item.value}
                  className="flex items-center"
                >
                  <Rate
                    disabled
                    value={item.value}
                    className="h-4 text-base leading-4"
                    allowHalf
                  />
                </Checkbox>
              ))}
            </Checkbox.Group>
          </Panel>
        </Collapse>
      </Row>
    </div>
  );
};

export default FilterBar;
