import { Route, Routes } from "react-router-dom";
import SearchMoviesList from "./components/lists/SearchMoviesList";
import SearchPersonsList from "./components/lists/SearchPersonsList";
import Home from "./pages/Home";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import NoMatch from "./pages/NoMatch";
import PersonDetailsPage from "./pages/PersonDetailsPage";
import Navigation from "./pages/pertials/Navigation";
import SearchPage from "./pages/SearchPage";

function App() {
  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="movie/:movie_id" element={<MovieDetailsPage />} />
        <Route path="person/:person_id" element={<PersonDetailsPage />} />
        <Route path="search/*" element={<SearchPage />}/>
      </Routes>
      s
    </div>
  );
}

export default App;
