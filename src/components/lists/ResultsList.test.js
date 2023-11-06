import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import ResultsList from "./ResultsList";

let movies = {
  total_results: 0,
};
let persons = {
  total_results: 0,
};
const MokeResultsList = () => {
  return (
    <BrowserRouter>
      <ResultsList movies={movies} persons={persons} />
    </BrowserRouter>
  );
};

describe("ResultsList total results", () => {
  test("should render the correct amount of movies", async () => {
    movies = {
      total_results: 100,
    };
    render(<MokeResultsList />);
    const spanElement = screen.getByText(/100/i);
    expect(spanElement).toBeInTheDocument();
  });

  test("should render the correct amount of persons", async () => {
    persons = {
      total_results: 80,
    };
    render(<MokeResultsList />);
    const spanElement = screen.getByText(/80/i);
    expect(spanElement).toBeInTheDocument();
  });

  test("should disabled when the amount is 0", async () => {
    movies = {
      total_results: 0,
    };
    persons = {
      total_results: 0,
    };
    render(<MokeResultsList />);
    const paragraphMoviesElement = screen.getByText(/movies/i);
    expect(paragraphMoviesElement).toHaveClass("disabled");
    const paragraphPersonsElement = screen.getByText(/people/i);
    expect(paragraphPersonsElement).toHaveClass("disabled");
  });
});
