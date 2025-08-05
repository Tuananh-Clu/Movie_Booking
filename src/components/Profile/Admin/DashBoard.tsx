import { FaUserAlt, FaTicketAlt, FaMoneyBillWave } from "react-icons/fa";

export const DashBoard = ({
  quantity,
  ticket,
  doanhthu,
}: {
  quantity: number;
  ticket: number;
  doanhthu: number;
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Người dùng */}
      <div className="bg-gradient-to-r from-purple-700 to-purple-900 text-white p-6 rounded-2xl shadow-lg flex items-center gap-4">
        <div className="text-4xl">
          <FaUserAlt />
        </div>
        <div>
          <h2 className="text-sm uppercase opacity-80">Người dùng</h2>
          <p className="text-2xl font-bold">{quantity}</p>
        </div>
      </div>

      {/* Số lượng vé */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white p-6 rounded-2xl shadow-lg flex items-center gap-4">
        <div className="text-4xl">
          <FaTicketAlt />
        </div>
        <div>
          <h2 className="text-sm uppercase opacity-80">Số lượng vé</h2>
          <p className="text-2xl font-bold">{ticket}</p>
        </div>
      </div>

      {/* Doanh thu */}
      <div className="bg-gradient-to-r from-green-700 to-green-900 text-white p-6 rounded-2xl shadow-lg flex items-center gap-4">
        <div className="text-4xl">
          <FaMoneyBillWave />
        </div>
        <div>
          <h2 className="text-sm uppercase opacity-80">Doanh thu</h2>
          <p className="text-2xl font-bold">
            {doanhthu.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </p>
        </div>
      </div>
    </div>
  );
};
