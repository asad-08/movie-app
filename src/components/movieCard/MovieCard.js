import React from "react";
import "./MovieCard.css";
import { Link } from "react-router-dom";

function MovieCard({ data }) {
  return (
    <div className="cursor-pointer movie_card h-96 bg-white rounded-lg shadow-white/20 shadow-lg hover:scale-105 ease-in duration-150">
      <Link to={`/movie/${data.imdbID}`}>
        <div className="card_img">
          <img
            className="rounded-t-lg p-1"
            src={data.Poster}
            alt={data.Title}
          />
        </div>
        <hr />
        <div className="p-5 ">
          <p className="movie_title">
            {data.Title.length > 50
              ? data.Title.substring(0, 50) + "..."
              : data.Title}
          </p>
          <p className="movie_year  text-slate-500">{data.Year}</p>
        </div>
      </Link>
    </div>
  );
}

export default MovieCard;
