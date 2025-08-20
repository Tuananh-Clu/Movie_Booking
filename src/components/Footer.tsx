import Logo from "../assets/2040698.png";

export const Footer = () => {
  return (
    <footer className="w-full text-white px-6 pt-34 pb-8 bg-gradient-to-t from-[--color-brand-pink]/10 via-transparent to-[--color-brand-cyan]/10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-10">

        {/* Logo + Socials */}
        <div className="flex flex-col gap-4 items-center md:items-start">
          <div className="flex items-center gap-3">
            <img className="w-10 h-10" src={Logo} alt="Logo" />
            <h1 className="text-3xl font-extrabold tracking-wide">AP CINEMA</h1>
          </div>
          <p className="text-sm text-gray-400 text-center md:text-left">
            Ứng dụng đặt vé xem phim trực tuyến mọi lúc mọi nơi.
          </p>
          <div className="flex gap-4 text-2xl mt-2">
            <a href="#"><i className="fa-brands fa-facebook hover:text-[--color-brand-cyan] transition" /></a>
            <a href="#"><i className="fa-brands fa-instagram hover:text-[--color-brand-pink] transition" /></a>
            <a href="#"><i className="fa-brands fa-twitch hover:text-[--color-brand-cyan] transition" /></a>
            <a href="#"><i className="fa-brands fa-x-twitter hover:text-gray-300 transition" /></a>
            <a href="#"><i className="fa-brands fa-youtube hover:text-[--color-brand-pink] transition" /></a>
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-col md:flex-row gap-10 text-sm justify-between text-gray-400">
          <div className="flex flex-col gap-2">
            <h2 className="text-white font-semibold mb-1">Thông tin</h2>
            <a href="#" className="hover:text-white transition">Giới thiệu</a>
            <a href="#" className="hover:text-white transition">Tin tức</a>
            <a href="#" className="hover:text-white transition">Liên hệ</a>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-white font-semibold mb-1">Chính sách</h2>
            <a href="#" className="hover:text-white transition">Điều khoản dịch vụ</a>
            <a href="#" className="hover:text-white transition">Chính sách bảo mật</a>
            <a href="#" className="hover:text-white transition">Quy định sử dụng</a>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-white font-semibold mb-1">Hỗ trợ</h2>
            <a href="#" className="hover:text-white transition">Câu hỏi thường gặp</a>
            <a href="#" className="hover:text-white transition">Hỗ trợ khách hàng</a>
            <a href="#" className="hover:text-white transition">Hướng dẫn đặt vé</a>
          </div>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="text-center text-xs text-gray-500 mt-12 border-t border-white/10 pt-4">
        © {new Date().getFullYear()} AP CINEMA. All rights reserved.
      </div>
    </footer>
  );
};
