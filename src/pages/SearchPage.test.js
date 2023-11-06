/* eslint-disable no-undef */
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import "@testing-library/jest-dom";
import SearchPage from "./SearchPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 2, // 2 minutes
      cacheTime: 1000 * 60 * 60 * 1, // 1 hours
    },
  },
});

const MockeSeachPage = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <SearchPage />
      </QueryClientProvider>
    </BrowserRouter>
  );
};

describe("SearchPage", () => {
  test("should render NoQuery when input field is enpty", async () => {
    render(<MockeSeachPage />);
    window.scrollTo = jest.fn();
    const headingElement = await screen.findByRole("heading", {
      name: /Search for a movie, person/i,
    });
    expect(headingElement).toBeInTheDocument();
  });
});
