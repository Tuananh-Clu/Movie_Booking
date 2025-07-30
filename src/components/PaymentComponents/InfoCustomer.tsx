import { useUser } from "@clerk/clerk-react";

export const InfoCustomer = () => {
  const { user } = useUser();
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 text-gray-900 space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4 border-b pb-2 flex items-center gap-2">
          👤 Thông Tin Khách Hàng
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-1 gap-4 text-base">
          <div>
            <span className="font-semibold">Họ và tên:</span> {user?.fullName}
          </div>
          <div>
            <span className="font-semibold">SĐT:</span>{" "}
            {user?.phoneNumbers[0]?.phoneNumber}
          </div>
          <div>
            <span className="font-semibold">Email:</span>{" "}
            {user?.emailAddresses[0]?.emailAddress}
          </div>
          <div>
            <span className="font-semibold">Ngày đặt:</span>{" "}
            {new Date().toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  );
};
