import type { MovieApi } from "../types/type";

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMGFiNTBjYzVhY2ZmOGZhOTViYjZiZGEzNzNlOGFhOSIsIm5iZiI6MTc1MDMzNDU1OC4xNDIwMDAyLCJzdWIiOiI2ODUzZmM1ZTFiNjk4MTUwMzMxYzBkMjUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.CvmU1iUHDVLB3URXcsclLzwV12E9iHkYyZetdsicdi4'
  }
};

export const ListMovieByType=async(type:string,setState:(data:MovieApi[])=>void,page:number):Promise<MovieApi[]>=>{
  try{
    const response= await fetch(`https://api.themoviedb.org/3/movie/${type}?language=en-US&page=${page}`, options)
    const data=await response.json();
    setState(data.results)
    return data.results
  }
  catch(error){
    console.log("Cant take data")
    return []
  }
}
