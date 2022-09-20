import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { getAllMovies } from "../../redux/movie/movieSlice";
import MovieCard from "../movieCard/MovieCard";

function MovieList({ handleTotalPage, handlePageSelect, pageNo }) {
  const movies = useSelector(getAllMovies);
  useEffect(() => {
    handleTotalPage(movies.totalResults / 10);
  }, [movies]);

  let renderMovie = "",
    renderShows = "";
  renderMovie =
    movies.Response === "True" ? (
      movies.Search.map((movie, index) => (
        <MovieCard key={index} data={movie} />
      ))
    ) : (
      <div className="movie_error">
        <h3 className="text-3xl text-red-700">{movies.Error}</h3>
      </div>
    );
  return (
    <div className="movie_list">
      <div>
        <h2 className=" px-2 text-3xl font-semibold text-white my-4">
          Movie List
        </h2>
        {/* flex items-center justify-center flex-wrap */}
        <div className="mb-16 px-2 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {renderMovie}
        </div>
      </div>
    </div>
  );
}

export default MovieList;
