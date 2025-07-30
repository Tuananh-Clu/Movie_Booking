import React from "react";

type Combo = {
  name: string;
  price: number;
  quantity: number;
};

type FoodProps = {
  combo: Combo[];
  setState: React.Dispatch<React.SetStateAction<Combo[]>>;
  combototal:  number;
};

export const Food: React.FC<FoodProps> = ({ combo, setState, combototal }) => {
  const handlePlus = (index: number) => {
    setState(prev =>
      prev.map((item, i) =>
        i === index ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleMinus = (index: number) => {
    setState(prev =>
      prev.map((item, i) =>
        i === index && item.quantity > 0
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-xl p-6 text-gray-900">
      <h2 className="text-2xl font-bold mb-4 border-b pb-2">🍿 Bắp - Nước</h2>
      <div className="flex flex-col gap-4">
        {combo.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl shadow">
            <div className="flex flex-col">
              <span className="font-semibold">{item.name}</span>
              <span className="text-gray-500">{item.price.toLocaleString()}đ</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleMinus(idx)}
                className="w-8 h-8 rounded-full bg-gray-200 text-lg font-bold flex items-center justify-center hover:bg-gray-300"
              >
                -
              </button>
              <span className="w-6 text-center">{item.quantity}</span>
              <button
                onClick={() => handlePlus(idx)}
                className="w-8 h-8 rounded-full bg-gray-200 text-lg font-bold flex items-center justify-center hover:bg-gray-300"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t mt-6 pt-4 flex justify-between text-lg font-semibold">
        <span>Tổng cộng:</span>
        <span className="text-red-500">{combototal.toLocaleString()}đ</span>
      </div>
    </div>
  );
};
