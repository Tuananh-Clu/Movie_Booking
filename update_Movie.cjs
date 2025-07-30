const axios = require('axios');
const fs = require('fs');

const BEARER_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMGFiNTBjYzVhY2ZmOGZhOTViYjZiZGEzNzNlOGFhOSIsIm5iZiI6MTc1MDMzNDU1OC4xNDIwMDAyLCJzdWIiOiI2ODUzZmM1ZTFiNjk4MTUwMzMxYzBkMjUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.CvmU1iUHDVLB3URXcsclLzwV12E9iHkYyZetdsicdi4';

const data = JSON.parse(fs.readFileSync('./asd_showtimes_rich_poster_fixed.json', 'utf-8'));

async function fetchMovieDetail(tmdbId) {
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${tmdbId}`, {
            headers: {
                Authorization: BEARER_TOKEN,
                accept: 'application/json'
            }
        });
        return {
            title: response.data.title,
            poster: `https://image.tmdb.org/t/p/w500${response.data.poster_path}`
        };
    } catch (error) {
        console.log(`❌ Lỗi TMDB ID ${tmdbId}:`, error.response?.data?.status_message || error.message);
        return null;
    }
}

async function updateFile() {
    const cinemas = data;

    const updatedIds = new Set();

    for (const cinema of cinemas) {
        for (const room of cinema.rooms) {
            for (const showtime of room.showtimes) {
                const tmdbId = showtime.movie.id.replace('tmdb_', '');

                if (!updatedIds.has(tmdbId)) {
                    const info = await fetchMovieDetail(tmdbId);
                    if (info) {
                        showtime.movie.title = info.title;
                        showtime.movie.poster = info.poster;
                        console.log(`✔️ Cập nhật ${tmdbId}: ${info.title}`);
                        updatedIds.add(tmdbId);
                    }
                }
            }
        }
    }

    fs.writeFileSync('./asd_updated.json', JSON.stringify(cinemas, null, 2), 'utf-8');
    console.log('✅ Đã lưu file ./asd_updated.json');
}

updateFile();
