import { formatPrice } from "@/lib/format";
import React, { FC } from "react";

interface PriceTagProps {
  price: number;
  className?: string;
}

const PriceTag: FC<PriceTagProps> = ({ price, className }) => {
  return <span className={`badge ${className}`}>{formatPrice(price)}</span>;
};

export default PriceTag;
