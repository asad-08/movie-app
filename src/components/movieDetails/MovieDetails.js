import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAsyncMovieOrShowDetails,
  getSelectedMovieOrShow,
  removeSelectedMovieOrShow,
} from "../../redux/movie/movieSlice";
import "./MovieDetails.css";

function MovieDetails() {
  const { imdbID } = useParams();
  const dispatch = useDispatch();
  const data = useSelector(getSelectedMovieOrShow);
  useEffect(() => {
    dispatch(fetchAsyncMovieOrShowDetails(imdbID));
    return () => {
      dispatch(removeSelectedMovieOrShow());
    };
  }, [imdbID, dispatch]);
  function isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }
  return (
    <div className="details w-full flex items-start justify-between gap-6 sm:flex-col lg:flex-row">
      {isEmpty(data) ? (
        <div
          role="status"
          class="space-y-8 animate-pulse md:space-y-0 md:space-x-8 md:flex md:items-center"
        >
          <div class="w-full">
            <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"></div>
            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
          </div>
          <div class="flex justify-center items-center w-full h-48 bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
            <svg
              class="w-12 h-12 text-gray-200"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 640 512"
            >
              <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
            </svg>
          </div>
          <span class="sr-only">Loading...</span>
        </div>
      ) : (
        <>
          <div className="details_info">
            <h2 className="text-3xl font-semibold text-white mb-4">Details</h2>
            <div>
              <h2 className="text-2xl font-bold text-yellow-400 my-2">
                {data.Title}{" "}
              </h2>
              <div className="text-blue-400 flex items-center justify-start gap-4">
                <label>
                  IMDB Rating <i className="fa fa-star text-yellow-400"></i>:{" "}
                  {data.imdbRating}
                </label>
                <label>
                  IMDB Votes <i className="fa fa-thumbs-up text-blue-400"></i>:{" "}
                  {data.imdbVotes}
                </label>
                <label>
                  Duration <i className="fa fa-clock text-white"></i>:{" "}
                  {data.Runtime}
                </label>
                <label>
                  Year <i className="fa fa-calendar text-orange-400"></i>:{" "}
                  {data.Year}
                </label>
              </div>
            </div>
            <div className="my-4 flex gap-6">
              <p className="text-white text-justify text-sm">{data.Plot}</p>
            </div>
            <div className="flex gap-6">
              <div className="flex flex-col text-white text-sm font-semibold">
                <label>Director</label>
                <label>Actors</label>
                <label>Genres</label>
                <label>Language</label>
                <label>Awards</label>
              </div>
              <div className="flex flex-col text-blue-300 text-sm font-semibold">
                <label>{data.Director}</label>
                <label>{data.Actors}</label>
                <label>{data.Genre}</label>
                <label>{data.Language}</label>
                <label>{data.Awards}</label>
              </div>
            </div>
          </div>
          <div className="details_img">
            <img className="rounded-lg" src={data.Poster} alt={data.Title} />
          </div>
        </>
      )}
    </div>
  );
}

export default MovieDetails;
