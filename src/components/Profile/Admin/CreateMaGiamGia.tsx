import axios from "axios";
import { useState } from "react";
import type { Voucher } from "../../../types/type";

export const CreateMaGiamGia = () => {
  const [voucherCode, setVoucherCode] = useState("");
  const [Description, setDescription] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [HanSuDung, setHanSuDung] = useState("");
  const [NgayBatDau, setNgayBatDau] = useState("");
  const [IsActive, setIsactive] = useState("true");
  const [MinimumOrderMount, setMinimumOrderMount] = useState(0);
  const [usageCount, setUsageCount] = useState(0);
  const [LoaiGiam, setLoaiGiam] = useState("Percent");
  const [LuotDungChoUSer, setLuotDungChoUser] = useState("1 lần");
  const [PhamViApDung, setPhamViApDung] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!voucherCode.trim()) {
      newErrors.voucherCode = "Mã giảm giá không được để trống";
    } else if (voucherCode.length < 3) {
      newErrors.voucherCode = "Mã giảm giá phải có ít nhất 3 ký tự";
    }

    if (!Description.trim()) {
      newErrors.Description = "Mô tả không được để trống";
    } else if (Description.length < 10) {
      newErrors.Description = "Mô tả phải có ít nhất 10 ký tự";
    }

    if (discountAmount <= 0) {
      newErrors.discountAmount = "Giá trị giảm giá phải lớn hơn 0";
    } else if (LoaiGiam === "Percent" && discountAmount > 100) {
      newErrors.discountAmount = "Giảm theo % không được vượt quá 100%";
    } else if (LoaiGiam === "Value" && discountAmount > 10000000) {
      newErrors.discountAmount =
        "Giá trị giảm không được vượt quá 10,000,000 VND";
    }

    if (!NgayBatDau) {
      newErrors.NgayBatDau = "Ngày bắt đầu không được để trống";
    }

    if (!HanSuDung) {
      newErrors.HanSuDung = "Ngày hết hạn không được để trống";
    }

    if (NgayBatDau && HanSuDung) {
      const startDate = new Date(NgayBatDau);
      const endDate = new Date(HanSuDung);
      if (endDate <= startDate) {
        newErrors.HanSuDung = "Ngày hết hạn phải sau ngày bắt đầu";
      }
    }

    if (usageCount <= 0) {
      newErrors.usageCount = "Giới hạn số lần phải lớn hơn 0";
    } else if (usageCount > 100000) {
      newErrors.usageCount = "Giới hạn số lần không được vượt quá 100,000";
    }

    if (MinimumOrderMount < 0) {
      newErrors.MinimumOrderMount = "Giá trị đơn hàng tối thiểu không được âm";
    }

    if (!PhamViApDung.trim()) {
      newErrors.PhamViApDung = "Phạm vi áp dụng không được để trống";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    const data: Voucher = {
      code: voucherCode,
      description: Description,
      discountAmount: discountAmount,
      expirationDate: HanSuDung,
      ngayBatDau: NgayBatDau,
      minimumOrderAmount: MinimumOrderMount,
      usageCount: usageCount,
      loaiGiam: LoaiGiam,
      soLuotUserDuocDung: LuotDungChoUSer,
      phamViApDung: PhamViApDung,
      isActive: IsActive,
    };

    try {
      await axios.post(
        "https://backendformoviebooking-production.up.railway.app/api/Voucher/AddVoucher",
        data
      );
      alert("Tạo mã giảm giá thành công!");
      // Reset form
      setVoucherCode("");
      setDescription("");
      setDiscountAmount(0);
      setHanSuDung("");
      setNgayBatDau("");
      setMinimumOrderMount(0);
      setUsageCount(0);
      setPhamViApDung("");
      setErrors({});
    } catch (error) {
      console.log("Lỗi khi tạo voucher:", error);
      alert("Có lỗi xảy ra khi tạo mã giảm giá!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen l ">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Tạo Mã Giảm Giá
          </h1>
          <p className="text-gray-300">
            Tạo và quản lý mã giảm giá một cách dễ dàng
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
          {/* Form Section */}
          <div className="xl:col-span-3">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6">
                {/* Basic Information */}
                <div className="border-b border-gray-100 pb-6 mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Thông tin cơ bản
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mã voucher <span className="text-red-500">*</span>
                      </label>
                      <input
                        onChange={(e) => setVoucherCode(e.target.value)}
                        value={voucherCode}
                        className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent ${
                          errors.voucherCode
                            ? "border-red-300 bg-red-50"
                            : "border-gray-300"
                        }`}
                        placeholder="SALE2025"
                      />
                      {errors.voucherCode && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.voucherCode}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Loại giảm
                      </label>
                      <select
                        value={LoaiGiam}
                        onChange={(e) => setLoaiGiam(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
                      >
                        <option value="Percent">Giảm theo %</option>
                        <option value="Value">Giảm số tiền</option>
                      </select>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Giá trị giảm <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        onChange={(e) =>
                          setDiscountAmount(Number(e.target.value))
                        }
                        value={discountAmount}
                        type="number"
                        min="0"
                        className={`w-full px-3 py-2 pr-12 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent ${
                          errors.discountAmount
                            ? "border-red-300 bg-red-50"
                            : "border-gray-300"
                        }`}
                        placeholder="20"
                      />
                      <span className="absolute right-3 top-2 text-gray-500 text-sm">
                        {LoaiGiam === "Percent" ? "%" : "VND"}
                      </span>
                    </div>
                    {errors.discountAmount && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.discountAmount}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mô tả <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      onChange={(e) => setDescription(e.target.value)}
                      value={Description}
                      rows={3}
                      className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent resize-none ${
                        errors.Description
                          ? "border-red-300 bg-red-50"
                          : "border-gray-300"
                      }`}
                      placeholder="Nhập mô tả chi tiết về mã giảm giá..."
                    />
                    {errors.Description && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.Description}
                      </p>
                    )}
                  </div>
                </div>

                {/* Time Settings */}
                <div className="border-b border-gray-100 pb-6 mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Thời gian áp dụng
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Ngày bắt đầu <span className="text-red-500">*</span>
                      </label>
                      <input
                        onChange={(e) => setNgayBatDau(e.target.value)}
                        value={NgayBatDau}
                        type="date"
                        className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent ${
                          errors.NgayBatDau
                            ? "border-red-300 bg-red-50"
                            : "border-gray-300"
                        }`}
                      />
                      {errors.NgayBatDau && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.NgayBatDau}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Ngày hết hạn <span className="text-red-500">*</span>
                      </label>
                      <input
                        onChange={(e) => setHanSuDung(e.target.value)}
                        value={HanSuDung}
                        type="date"
                        className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent ${
                          errors.HanSuDung
                            ? "border-red-300 bg-red-50"
                            : "border-gray-300"
                        }`}
                      />
                      {errors.HanSuDung && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.HanSuDung}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Usage Settings */}
                <div className="border-b border-gray-100 pb-6 mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Giới hạn sử dụng
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Số lần sử dụng <span className="text-red-500">*</span>
                      </label>
                      <input
                        onChange={(e) => setUsageCount(Number(e.target.value))}
                        value={usageCount}
                        type="number"
                        min="1"
                        className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent ${
                          errors.usageCount
                            ? "border-red-300 bg-red-50"
                            : "border-gray-300"
                        }`}
                        placeholder="100"
                      />
                      {errors.usageCount && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.usageCount}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Giới hạn người dùng
                      </label>
                      <select
                        value={LuotDungChoUSer}
                        onChange={(e) => setLuotDungChoUser(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
                      >
                        <option value="1 lần">1 lần</option>
                        <option value="Nhiều lần">Nhiều lần</option>
                        <option value="Không giới hạn">Không giới hạn</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Conditions */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Điều kiện áp dụng
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phạm vi áp dụng <span className="text-red-500">*</span>
                      </label>
                      <input
                        onChange={(e) => setPhamViApDung(e.target.value)}
                        value={PhamViApDung}
                        className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent ${
                          errors.PhamViApDung
                            ? "border-red-300 bg-red-50"
                            : "border-gray-300"
                        }`}
                        placeholder="Ví dụ: Cgv Ba Trieu, BHD Lam Son"
                      />
                      {errors.PhamViApDung && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.PhamViApDung}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Đơn hàng tối thiểu
                        </label>
                        <div className="relative">
                          <input
                            onChange={(e) =>
                              setMinimumOrderMount(Number(e.target.value))
                            }
                            value={MinimumOrderMount}
                            type="number"
                            min="0"
                            className={`w-full px-3 py-2 pr-12 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent ${
                              errors.MinimumOrderMount
                                ? "border-red-300 bg-red-50"
                                : "border-gray-300"
                            }`}
                            placeholder="0"
                          />
                          <span className="absolute right-3 top-2 text-gray-500 text-sm">
                            VND
                          </span>
                        </div>
                        {errors.MinimumOrderMount && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.MinimumOrderMount}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Trạng thái
                        </label>
                        <select
                          value={IsActive}
                          onChange={(e) => setIsactive(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
                        >
                          <option value="true">Hoạt động</option>
                          <option value="false">Tạm dừng</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="w-full bg-gray-900 hover:bg-gray-800 disabled:bg-gray-400 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Đang tạo...
                    </>
                  ) : (
                    "Tạo mã giảm giá"
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="xl:col-span-2">
            <div className="sticky top-6 space-y-6">
              {/* Voucher Preview */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Xem trước voucher
                  </h3>

                  <div className="relative bg-gray-900 rounded-xl p-6 text-white overflow-hidden">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full -translate-x-3"></div>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full translate-x-3"></div>

                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-medium text-gray-300 uppercase tracking-wide">
                        Voucher
                      </span>
                      <div
                        className={`w-2 h-2 rounded-full ${
                          IsActive === "true" ? "bg-green-400" : "bg-red-400"
                        }`}
                      ></div>
                    </div>

                    <div className="text-center mb-4">
                      <h4 className="text-2xl font-bold mb-2 font-mono tracking-wider">
                        {voucherCode || "VOUCHER CODE"}
                      </h4>

                      {/* Discount value */}
                      <div className="text-3xl font-bold text-yellow-400 mb-2">
                        {discountAmount > 0
                          ? LoaiGiam === "Percent"
                            ? `${discountAmount}%`
                            : `${discountAmount.toLocaleString()}đ`
                          : "0%"}
                      </div>

                      <p className="text-gray-300 text-sm leading-relaxed">
                        {Description || "Mô tả voucher sẽ hiển thị tại đây"}
                      </p>
                    </div>

                    {/* Voucher details */}
                    <div className="space-y-2 text-xs text-gray-300">
                      <div className="flex justify-between">
                        <span>Có hiệu lực:</span>
                        <span>
                          {NgayBatDau
                            ? new Date(NgayBatDau).toLocaleDateString("vi-VN")
                            : "Chưa chọn"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Hết hạn:</span>
                        <span>
                          {HanSuDung
                            ? new Date(HanSuDung).toLocaleDateString("vi-VN")
                            : "Chưa chọn"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Áp dụng cho:</span>
                        <span className="text-right max-w-32 truncate">
                          {PhamViApDung || "Chưa xác định"}
                        </span>
                      </div>
                      {MinimumOrderMount > 0 && (
                        <div className="flex justify-between">
                          <span>Đơn tối thiểu:</span>
                          <span>{MinimumOrderMount.toLocaleString()}đ</span>
                        </div>
                      )}
                    </div>

                    <button className="w-full mt-4 bg-white text-gray-900 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
                      Sử dụng voucher
                    </button>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Thống kê
                  </h3>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-gray-900">
                        {usageCount || 0}
                      </div>
                      <div className="text-sm text-gray-600">Lượt sử dụng</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-gray-900">
                        {HanSuDung && NgayBatDau
                          ? Math.max(
                              0,
                              Math.ceil(
                                (new Date(HanSuDung).getTime() -
                                  new Date().getTime()) /
                                  (1000 * 60 * 60 * 24)
                              )
                            )
                          : 0}
                      </div>
                      <div className="text-sm text-gray-600">Ngày còn lại</div>
                    </div>
                  </div>

                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">
                      Giá trị giảm tối đa
                    </div>
                    <div className="text-xl font-bold text-gray-900">
                      {LoaiGiam === "Percent"
                        ? `${discountAmount}% OFF`
                        : `${discountAmount.toLocaleString()}đ`}
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Info */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Thông tin nhanh
                  </h3>

                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Trạng thái:</span>
                      <span
                        className={`font-medium ${
                          IsActive === "true"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {IsActive === "true" ? "Hoạt động" : "Tạm dừng"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Loại giảm:</span>
                      <span className="font-medium text-gray-900">
                        {LoaiGiam === "Percent"
                          ? "Theo phần trăm"
                          : "Số tiền cố định"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="text-gray-600">Giới hạn user:</span>
                      <span className="font-medium text-gray-900">
                        {LuotDungChoUSer}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
