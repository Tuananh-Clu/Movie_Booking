import React, { useState } from "react";
import YouTube from "react-youtube";

type Video = {
  id: string;
  img: string;
};

export const Trailer: React.FC<Video> = () => {
  const [trailerlist] = useState<Video[]>([
    {
      id: "8yh9BPUBbbQ",
      img: "https://media.licdn.com/dms/image/v2/D5612AQE-eEYtB_RlMg/article-cover_image-shrink_720_1280/B56ZfIihdUHoAI-/0/1751416183338?e=2147483647&v=beta&t=5mawOWqVTHazyhLGyutrcV4hDjz47ptI1vwGCbnAWpo",
    },
    {
      id: "yNN2PoilSp4",
      img: "https://wallpapers.com/images/hd/john-wick-4-gr47a7v7kn7bd86r.jpg",
    },
    {
      id: "9ix7TUGVYIo",
      img: "https://tse4.mm.bing.net/th/id/OIP.5C-RqGrGbSciIQGjxsx_kwHaEK?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    },
    {
      id: "uYPbbksJxIg",
      img: "https://image.tmdb.org/t/p/original/YXH7QseLsRFCeQUwKGkc6m4GGf.jpg",
    },
  ]);
  const [onClickTrailer, setOnClickTrailer] = useState("yNN2PoilSp4");
  return (
    <div className="w-full items-center justify-center text-white pt-20 gap-5 flex flex-col mt-20">
      <h1 className="text-3xl font-bold">TRAILERS</h1>
      <div className="w-full items-center flex flex-col  justify-center">
        <div className="w-full max-w-7xl aspect-video rounded-2xl overflow-hidden">
          <YouTube
            videoId={onClickTrailer}
            className="w-full h-full"
            opts={{
              width: "100%",
              height: "100%",
              playerVars: {},
            }}
          />
        </div>
        </div>

      {/* Danh sách thumbnail */}
      <div className="md:flex md:flex-row grid grid-cols-2 grid-rows-2 gap-3 rounded-2xl items-center justify-center p-5 mt-10 bg-white/5 backdrop-blur ring-1 ring-white/10">
        {trailerlist.map((item, index) => (
              <div
                key={index}
            className="relative group cursor-pointer w-20 md:w-40 h-24 min-w-[160px]"
                onClick={() => setOnClickTrailer(item.id)}
              >
                <i className="fa-solid fa-play text-white text-xl absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition duration-200 z-10"></i>
                <img
                  src={item.img}
                  alt="Trailer thumbnail"
                  className="w-full h-full object-cover rounded-2xl group-hover:brightness-50 transition duration-200"
                />
              </div>
        ))}
      </div>
    </div>
  );
};
