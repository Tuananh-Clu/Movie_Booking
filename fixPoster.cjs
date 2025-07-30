const fs = require('fs');
const path = require('path');

// Danh sách poster hợp lệ
const posters = {
  "Inside Out 2": "https://i.pinimg.com/originals/42/cf/ed/42cfedc52183c2dfb98974a573bea021.jpg",
  "Ballerina": "https://static1.moviewebimages.com/wordpress/wp-content/uploads/sharedimages/2024/09/ballerina-custom-sr-poster.jpg",
  "Jurassic World Rebirth": "https://tse3.mm.bing.net/th/id/OIP.VHfHVTDIo4lV1mVhtZkKjAHaK-?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
  "F1": "https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
  "28 Years Later": "https://cdn.flickeringmyth.com/wp-content/uploads/2024/12/28-Years-Later-Poster-600x750.jpg",
  "M3GAN 2.0": "https://image.tmdb.org/t/p/original/hq0ONyCxMNirXetaEjDY7iOp29p.jpg",
  "The Phoenician Scheme": "https://www.uphe.com/sites/default/files/styles/scale__319w_/public/2025/06/ThePhoenicianScheme_Poster.webp?itok=TgjbwT4P",
  "Elio": "https://tse2.mm.bing.net/th/id/OIP.MBN5UWFt6AnhWdV_LmhpygHaJ4?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
  "Horizontal Life of Chuck": "https://www.fangoria.com/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2025/04/CHUCK-Poster-Full-693x1024.png.webp",
  "JUJUTSU KAISEN: Hidden Inventory": "https://64.media.tumblr.com/3ec444063f86bb3c8174718f45a821dd/a48b8f3ee94e2129-ec/s1280x1920/e255185af91d433930291f5c4ea977bb28ac4833.jpg"
};

const inputFile = path.join(__dirname, 'asd_showtimes_rich.json');
const outputFile = path.join(__dirname, 'asd_showtimes_rich_poster_fixed.json');

// Đọc dữ liệu JSON
const raw = fs.readFileSync(inputFile, 'utf-8');
const data = JSON.parse(raw);

// Cập nhật poster
data.forEach(cinema => {
  cinema.rooms.forEach(room => {
    room.showtimes.forEach(showtime => {
      const title = showtime.movie.title;
      if (posters[title]) {
        showtime.movie.poster = posters[title];
      }
    });
  });
});

// Ghi lại file mới
fs.writeFileSync(outputFile, JSON.stringify(data, null, 2), 'utf-8');
console.log(`✅ Đã ghi file: ${outputFile}`);
