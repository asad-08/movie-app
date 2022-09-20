import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchAsyncMovies,
  fetchAsyncShows,
  getSearchText,
  getSearchType,
  setSearchText,
} from "../../redux/movie/movieSlice";
import "./Header.css";

function Header() {
  const searchText = useSelector(getSearchText);
  // const searchType = useSelector(getSearchType);

  const dispatch = useDispatch();
  function handleFormSubmit(e) {
    e.preventDefault();
    dispatch(fetchAsyncMovies({ page: 1, searchText: searchText }));
    dispatch(fetchAsyncShows({ page: 1, searchText: searchText }));
  }
  function handleSearch(e) {
    dispatch(setSearchText(e.target.value));
  }
  return (
    <div className="header sticky top-0 left-0 z-10 flex items-center justify-between px-2 py-2 bg-neutral-900 border-b-4 border-amber-500 md:px-16">
      <Link to="/movie-app">
        <div className="logo text-white font-bold font-3xl flex items-center gap-2">
          <i className="fa-solid fa-clapperboard text-3xl md:text-base"></i>{" "}
          <span className="hidden md:block">Movie App</span>
        </div>
      </Link>
      <div>
        <form onSubmit={handleFormSubmit} className="flex items-center">
          <input
            className="border-none outline-none rounded-tl-full rounded-bl-full  px-5 py-2"
            placeholder="Search movie or series..."
            value={searchText}
            onChange={(e) => handleSearch(e)}
          />
          <button
            type="submit"
            className="bg-yellow-400 rounded-tr-full rounded-br-full px-5 py-2"
          >
            <i className="fa fa-search"></i>
          </button>
        </form>
      </div>
      <div className="text-white flex items-center justify-start gap-2">
        <div className="w-7 h-7 hidden rounded-full border-2 border-white sm:flex sm:items-center sm:justify-center sm:w-10 sm:h-10">
          <i className="fa-solid fa-user"></i>
        </div>

        <div>
          <button
            type="button"
            className="login_button text-black rounded-full px-2 py-1 bg-yellow-400 hover:bg-yellow-500 sm:px-5 sm:py-1.5"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
