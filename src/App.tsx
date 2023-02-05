import { Route, Routes } from "react-router-dom";
import GenrePage from "./pages/GenrePage";
import Home from "./pages/Home";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import PersonDetailsPage from "./pages/PersonDetailsPage";
import Navigation from "./pages/pertials/Navigation";
import SearchPage from "./pages/SearchPage";
import styles from "./css/Navbar.module.scss";
import { useNavbarContext } from "./contexts/NavBarContext";

function App() {
  const { showMenu } = useNavbarContext();
  return (
    <div className={` ${showMenu && styles.open} App`}>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:movie_id" element={<MovieDetailsPage />} />
        <Route path="/person/:person_id" element={<PersonDetailsPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/genre" element={<GenrePage />} />
      </Routes>
    </div>
  );
}

export default App;
