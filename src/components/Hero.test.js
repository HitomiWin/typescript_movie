/* eslint-disable no-undef */
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import Hero from "./Hero";
import SearchForm from "./forms/SearchForm";

test("should render hero component with search-form", async () => {
  render(
    <BrowserRouter>
      <Hero>
        <SearchForm />
      </Hero>
    </BrowserRouter>,
  );
  const serachFormElement = screen.getByPlaceholderText(/Search for a movie/i);
  expect(serachFormElement).toBeInTheDocument();
});


test("should render hero component with search box", async () => {
  render(
    <BrowserRouter>
      <Hero>
        <SearchForm />
      </Hero>
    </BrowserRouter>,
  );
  const serachFormElement = screen.getByRole('searchbox');
  expect(serachFormElement).toBeInTheDocument();
});

