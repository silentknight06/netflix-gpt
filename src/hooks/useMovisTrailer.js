import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addTrailerVideo } from "../utils/moviesSlice";
import { useEffect } from "react";

const useMoviesTrailer = (movieId) => {
  const dispatch = useDispatch();
  const  trailerVideo = useSelector(store=>store.movies.addTrailerVideo);
 
  const getMovieVideos = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/" +
        movieId +
        "/videos?language=en-US",
      API_OPTIONS
    );
    const json = await data.json();
    

    const filterData = json.results.filter((video) => video.type === "Trailer");
    const Trailer = filterData.length ? filterData[0] : json.results[0];

    dispatch(addTrailerVideo(Trailer));
  };

  useEffect(() => {
   !trailerVideo && getMovieVideos();
  }, []);
};

export default useMoviesTrailer;
