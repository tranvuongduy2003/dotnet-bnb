import { useCategoriesStore } from "@/stores/useCategoryStore";
import React from "react";

interface ICategoryTagProps {
  value: number | string;
}

const CategoryTag: React.FunctionComponent<ICategoryTagProps> = ({ value }) => {
  const categories = useCategoriesStore((state) => state.categories);

  const category = categories.find((item) => item.id === value);

  return (
    <div className="inline-block px-3 py-1 rounded-full text-primary-500 bg-primary-100">
      {category?.name}
    </div>
  );
};

export default CategoryTag;
