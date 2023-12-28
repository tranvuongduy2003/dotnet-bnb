import { Button } from "antd";
import React from "react";

const Banner: React.FunctionComponent = () => {
  return (
    <div className="flex items-center justify-between px-48 py-10 bg-primary-100">
      <div className="flex flex-col items-start">
        <span className="mb-3 text-lg text-neutral-900">
          Absolutely hot collections 🔥
        </span>
        <span className="mb-6 text-4xl font-bold leading-[56px]">
          The Best Place To
          <br />
          Find And Buy
          <br />
          Amazing <span className="text-[#8353E2FF]">Product</span>
        </span>
        <Button type="primary" className="bg-primary" size="large">
          Shop now!
        </Button>
      </div>
      <div>
        <img
          src="/assets/banner.png"
          alt="banner"
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
};

export default Banner;
