import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import ResultsList from "./ResultsList";

describe("ResultsList total results", () => {
  test("should render the correct amount of movies", async () => {
    render(
      <BrowserRouter>
        <ResultsList movies={{ total_results: 100 }} />
      </BrowserRouter>,
    );
    const spanElement = screen.getByText(/100/i);
    expect(spanElement).toBeInTheDocument();
  });

  test("should render the correct amount of persons", async () => {
    render(
      <BrowserRouter>
        <ResultsList persons={{ total_results: 80 }} />
      </BrowserRouter>,
    );
    const spanElement = screen.getByText(/80/i);
    expect(spanElement).toBeInTheDocument();
  });
});
