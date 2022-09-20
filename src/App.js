import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import MovieDetails from "./components/movieDetails/MovieDetails";
import Footer from "./components/footer/Footer";
import PageNotFound from "./components/pageNotFound/PageNotFound";

function App() {
  return (
    <div className="movie-app bg-gradient-to-t from-slate-500 to-black">
      <Router>
        <Header></Header>
        <Routes>
          <Route path="/movie-app" element={<Home />} exact />
          {/* <Route path="/" element={<Home />} exact /> */}
          <Route path="movie/:imdbID" element={<MovieDetails />} exact />
          <Route element={<PageNotFound />} />
        </Routes>
        <Footer></Footer>
      </Router>
    </div>
  );
}

export default App;
