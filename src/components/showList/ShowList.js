import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { getAllShows } from "../../redux/movie/movieSlice";
import MovieCard from "../movieCard/MovieCard";

function ShowList({ handleTotalPageShow, handlePageSelectShow }) {
  const shows = useSelector(getAllShows);

  useEffect(() => {
    handleTotalPageShow(shows.totalResults / 10);
  }, [shows]);

  let renderShows = "";

  renderShows =
    shows.Response === "True" ? (
      shows.Search.map((movie, index) => <MovieCard key={index} data={movie} />)
    ) : (
      <div className="movie_error">
        <h3 className="text-3xl text-red-700">{shows.Error}</h3>
      </div>
    );
  return (
    <div className="movie_list">
      <div>
        <h2 className=" px-2 text-3xl font-semibold text-white my-4">
          Series List
        </h2>
        <div className="mb-16 px-2 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {renderShows}
        </div>
      </div>
    </div>
  );
}

export default ShowList;
