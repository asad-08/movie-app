import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import movieApi from "../../backend/movieApi/movieApi";
import { movieApiKey } from "../../backend/movieApi/movieApiKey";

export const fetchAsyncMovies = createAsyncThunk(
  "movies/fetchAsyncMovies",
  async (obj) => {
    const url = `?apiKey=${movieApiKey}&s=${
      obj.searchText === "" ? "avengers" : obj.searchText
    }&type=movie&page=${obj.page}`;
    const res = await movieApi.get(url).catch((e) => {
      console.log("Error: ", e);
    });
    return res.data;
  }
);
export const fetchAsyncShows = createAsyncThunk(
  "movies/fetchAsyncShows",
  async (obj) => {
    const url = `?apiKey=${movieApiKey}&s=${
      obj.searchText === "" ? "friends" : obj.searchText
    }&type=series&page=${obj.page}`;
    const res = await movieApi.get(url).catch((e) => {
      console.log("Error: ", e);
    });
    return res.data;
  }
);
export const fetchAsyncMovieOrShowDetails = createAsyncThunk(
  "movies/fetchAsyncMovieOrShowDetails",
  async (id) => {
    const res = await movieApi
      .get(`?apiKey=${movieApiKey}&i=${id}&Plot=full`)
      .catch((e) => {
        console.log("Error: ", e);
      });
    return res.data;
  }
);

const initialState = {
  movies: {},
  shows: {},
  selectedMovieOrShow: {},
  searchText: "",
  searchType: "movie",
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    addMovies: (state, { payload }) => {
      state.movies = payload;
    },
    setSearchText: (state, { payload }) => {
      state.searchText = payload;
    },
    setSearchType: (state, { payload }) => {
      state.searchType = payload;
    },
    removeSelectedMovieOrShow: (state) => {
      state.selectedMovieOrShow = {};
    },
  },
  extraReducers: {
    [fetchAsyncMovies.pending]: () => {
      console.log("Fetching Data...");
    },
    [fetchAsyncMovies.fulfilled]: (state, { payload }) => {
      return { ...state, movies: payload };
    },
    [fetchAsyncMovies.rejected]: () => {
      console.log("Rejected!");
    },
    [fetchAsyncShows.fulfilled]: (state, { payload }) => {
      return { ...state, shows: payload };
    },
    [fetchAsyncMovieOrShowDetails.fulfilled]: (state, { payload }) => {
      return { ...state, selectedMovieOrShow: payload };
    },
  },
});
export const {
  addMovies,
  removeSelectedMovieOrShow,
  setSearchText,
  setSearchType,
} = movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
export const getSearchText = (state) => state.movies.searchText;
export const getSearchType = (state) => state.movies.searchType;
export const getSelectedMovieOrShow = (state) =>
  state.movies.selectedMovieOrShow;
export default movieSlice.reducer;
