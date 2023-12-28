import React from "react";

interface IFilterMenuProps {
  selectedItem: any;
  items: any;
  onSelect: any;
}

interface IMenuItemProps {
  title: string;
  checked: boolean;
  onClick: any;
}

const FilterMenu: React.FunctionComponent<IFilterMenuProps> = ({
  selectedItem,
  items,
  onSelect,
}) => {
  return (
    <div className="flex w-full my-10">
      {items.map((item: any) => (
        <MenuItem
          key={item.value}
          onClick={() => onSelect(item)}
          title={item.title}
          checked={selectedItem.value === item.value}
        />
      ))}
    </div>
  );
};

const MenuItem: React.FunctionComponent<IMenuItemProps> = ({
  title,
  checked,
  onClick,
}) => {
  return (
    <div
      className={`${
        checked ? "bg-primary text-white" : "bg-white text-primary"
      } rounded-full px-6 py-3 cursor-pointer`}
      onClick={onClick}
    >
      {title}
    </div>
  );
};

export default FilterMenu;
