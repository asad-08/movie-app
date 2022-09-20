import React, { useEffect, useState } from "react";
import "./Home.css";
import MovieList from "../movieList/MovieList";
import {
  fetchAsyncMovies,
  fetchAsyncShows,
  getSearchText,
} from "../../redux/movie/movieSlice";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import ShowList from "../showList/ShowList";

function Home() {
  const dispatch = useDispatch();
  const searchText = useSelector(getSearchText);
  const [pageNo, setPageNo] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [pageNoShow, setPageNoShow] = useState(1);
  const [totalPageShow, setTotalPageShow] = useState(0);
  useEffect(() => {
    dispatch(fetchAsyncMovies({ page: pageNo, searchText: searchText }));
    dispatch(fetchAsyncShows({ page: pageNoShow, searchText: searchText }));
  }, [dispatch]);
  function handlePageSelect(val) {
    setPageNo(val.selected + 1);
    dispatch(
      fetchAsyncMovies({ page: val.selected + 1, searchText: searchText })
    );
  }
  function handleTotalPage(val) {
    setTotalPage(val);
  }
  function handlePageSelectShow(val) {
    setPageNo(val.selected + 1);
    dispatch(
      fetchAsyncShows({ page: val.selected + 1, searchText: searchText })
    );
  }
  function handleTotalPageShow(val) {
    setTotalPageShow(val);
  }

  return (
    <div className="home max-w-7xl mx-auto ">
      <div className="banner"></div>
      <MovieList
        handleTotalPage={handleTotalPage}
        handlePageSelect={handlePageSelect}
        pageNo={pageNo}
      />
      <div>
        <ReactPaginate
          previousLabel={"<<"}
          nextLabel={">>"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={totalPage}
          marginPagesDisplayed={1}
          pageRangeDisplayed={2}
          onPageChange={handlePageSelect}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />
      </div>

      <ShowList
        handleTotalPageShow={handleTotalPageShow}
        handlePageSelectShow={handlePageSelectShow}
      />
      <div>
        <ReactPaginate
          previousLabel={"<<"}
          nextLabel={">>"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={totalPageShow}
          marginPagesDisplayed={1}
          pageRangeDisplayed={2}
          onPageChange={handlePageSelectShow}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />
      </div>
    </div>
  );
}

export default Home;
