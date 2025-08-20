export const MaGiamGia = () => {
  const vouchers = [
    { code: "APMOVIE10", desc: "Giảm 10% cho đơn từ 100.000đ", exp: "31/12/2025" },
    { code: "APMOVIE20", desc: "Giảm 20% cho combo bắp nước", exp: "31/12/2025" },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-white">🎟️ Mã Giảm Giá</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {vouchers.map(v => (
          <div key={v.code} className="p-4 rounded-2xl bg-white/5 backdrop-blur ring-1 ring-white/10 text-white flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">{v.code}</h3>
              <p className="text-sm text-gray-300">{v.desc}</p>
              <p className="text-xs text-gray-400 mt-1">HSD: {v.exp}</p>
            </div>
            <button className="px-4 py-2 rounded-xl text-white bg-gradient-to-r from-[--color-brand-pink] to-[--color-brand-cyan] hover:opacity-90">Sao chép</button>
          </div>
        ))}
      </div>
    </div>
  )
}
