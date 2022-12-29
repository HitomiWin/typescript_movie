import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import PersonDetailsPage from "./pages/PersonDetailsPage";
import Navigation from "./pages/pertials/Navigation";

function App() {
  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:movie_id" element={<MovieDetailsPage />}></Route>
        <Route
          path="/person/:person_id"
          element={<PersonDetailsPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
