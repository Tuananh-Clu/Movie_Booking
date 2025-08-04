export const DashBoard = ({ quantity }: { quantity: number }) => {
  return (
    <div className="flex flex-row gap-3">
      <div className="bg-red-900 text-white p-5 rounded-2xl">
        <h1>Người Dùng:</h1>
        <h1 className="text-2xl font-bold">{quantity}</h1>
      </div>
      <div className="bg-red-900 text-white p-5 rounded-2xl">
        <h1>Số Lượng Vé:</h1>
        <h1 className="text-2xl font-bold">{quantity}</h1>
      </div>
      <div className="bg-red-900 text-white p-5 rounded-2xl">
        <h1>Doanh Thu:</h1>
        <h1 className="text-2xl font-bold">{quantity}</h1>
      </div>
    </div>
  );
};
