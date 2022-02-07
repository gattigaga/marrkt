import React from "react";

type CartInfoProps = {
  label: string;
  value: string;
};

const CartInfo: React.FC<CartInfoProps> = ({ label, value }) => {
  return (
    <div className="flex items-center justify-between py-4 border-t border-gray-200">
      <p className="text-xs text-black">{label}</p>
      <p className="text-xs text-black">{value}</p>
    </div>
  );
};

export default CartInfo;
