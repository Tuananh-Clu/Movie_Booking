export const CreateMaGiamGia = () => {
    return (
    <div className=" flex items-center justify-center p-2">
      <div className="w-full max-w-6xl bg-gray-800 rounded-2xl shadow-2xl grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
        
        {/* Form */}
        <div className="p-8 space-y-6">
          <h2 className="text-2xl font-bold text-white">Tạo Mã Giảm Giá</h2>
          
          <div className="space-y-4">
            {/* Mã */}
            <div>
              <label className="block text-gray-300 text-sm mb-1">Mã giảm giá</label>
              <input className="w-full rounded-lg bg-gray-700 text-white p-2" placeholder="SALE2025" />
            </div>

            {/* Loại giảm */}
            <div>
              <label className="block text-gray-300 text-sm mb-1">Loại giảm</label>
              <select className="w-full rounded-lg bg-gray-700 text-white p-2">
                <option>Giảm %</option>
                <option>Giảm số tiền</option>
              </select>
            </div>

            {/* Giá trị */}
            <div>
              <label className="block text-gray-300 text-sm mb-1">Giá trị</label>
              <input type="number" className="w-full rounded-lg bg-gray-700 text-white p-2" placeholder="20" />
            </div>

            {/* Ngày */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 text-sm mb-1">Ngày bắt đầu</label>
                <input type="date" className="w-full rounded-lg bg-gray-700 text-white p-2" />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-1">Ngày hết hạn</label>
                <input type="date" className="w-full rounded-lg bg-gray-700 text-white p-2" />
              </div>
            </div>

            {/* Giới hạn */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 text-sm mb-1">Giới hạn số lần</label>
                <input type="number" className="w-full rounded-lg bg-gray-700 text-white p-2" placeholder="100" />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-1">Mỗi user được dùng</label>
                <select className="w-full rounded-lg bg-gray-700 text-white p-2">
                  <option>1 lần</option>
                  <option>Nhiều lần</option>
                  <option>Không giới hạn</option>
                </select>
              </div>
            </div>

            {/* Áp dụng */}
            <div>
              <label className="block text-gray-300 text-sm mb-1">Áp dụng cho</label>
              <input className="w-full rounded-lg bg-gray-700 text-white p-2" placeholder="Ví dụ: Laptop ASUS, Rạp Beta..." />
            </div>

            {/* Mô tả */}
            <div>
              <label className="block text-gray-300 text-sm mb-1">Mô tả</label>
              <textarea className="w-full rounded-lg bg-gray-700 text-white p-2 h-20" placeholder="Mã giảm 20% cho toàn bộ sản phẩm..." />
            </div>
          </div>

          <button className="w-full bg-gray-600 hover:bg-gray-500 text-white py-2 rounded-lg font-semibold transition">
            Lưu mã
          </button>
        </div>

        {/* Preview */}
        <div className="bg-gray-700 flex items-center justify-center p-8">
          <div className="bg-gradient-to-br from-gray-600 to-gray-800 rounded-xl shadow-xl p-6 w-96 text-center relative overflow-hidden">
            
            {/* Viền cắt kiểu coupon */}
            <div className="absolute top-0 left-0 h-full w-6 bg-gray-900 rounded-r-full"></div>
            <div className="absolute top-0 right-0 h-full w-6 bg-gray-900 rounded-l-full"></div>

            <span className="inline-block bg-gray-900 text-gray-200 text-xs px-3 py-1 rounded-full mb-3">
              Mã giảm giá
            </span>
            <h3 className="text-3xl font-bold text-white mb-2">SALE2025</h3>
            <p className="text-gray-300 mb-2">Giảm 20% cho đơn hàng từ 500K</p>
            <p className="text-sm text-gray-400 mb-4">Hạn dùng: 31/12/2025</p>

            <button className="w-full bg-gray-900 hover:bg-gray-800 text-white py-2 rounded-lg font-semibold transition">
              Dùng ngay
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
