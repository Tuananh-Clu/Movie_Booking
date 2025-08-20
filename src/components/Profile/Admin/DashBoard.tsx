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
      <div className="relative overflow-hidden text-white p-6 rounded-2xl shadow-lg flex items-center gap-4 bg-gradient-to-br from-[--color-brand-pink] to-[--color-brand-cyan] ring-1 ring-white/10">
        <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
        <div className="text-4xl">
          <FaUserAlt />
        </div>
        <div>
          <h2 className="text-sm uppercase opacity-80">Người dùng</h2>
          <p className="text-2xl font-bold">{quantity}</p>
        </div>
      </div>

      {/* Số lượng vé */}
      <div className="relative overflow-hidden text-white p-6 rounded-2xl shadow-lg flex items-center gap-4 bg-gradient-to-br from-[--color-brand-cyan] to-[--color-brand-pink] ring-1 ring-white/10">
        <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
        <div className="text-4xl">
          <FaTicketAlt />
        </div>
        <div>
          <h2 className="text-sm uppercase opacity-80">Số lượng vé</h2>
          <p className="text-2xl font-bold">{ticket}</p>
        </div>
      </div>

      {/* Doanh thu */}
      <div className="relative overflow-hidden text-white p-6 rounded-2xl shadow-lg flex items-center gap-4 bg-gradient-to-br from-[--color-brand-pink] to-[--color-brand-cyan] ring-1 ring-white/10">
        <div className="absolute -right-6 bottom-0 w-24 h-24 bg-white/10 rounded-full blur-xl" />
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
