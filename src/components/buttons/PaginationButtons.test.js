import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PaginationButtons from "./PaginationButtons";

describe("PaginationButtons ", () => {
  test("should render buttons group", async () => {
    render(<PaginationButtons />);
    const prevButtonElement = screen.getByRole("button", { name: /Prev/i });
    const nextButtonElement = screen.getByRole("button", { name: /Next/i });
    const headingElement = screen.getByRole("heading", {
      name: /Current Page/i,
    });
    expect(prevButtonElement).toBeInTheDocument();
    expect(nextButtonElement).toBeInTheDocument();
    expect(headingElement).toBeInTheDocument();
  });

  test("should prev button be disabled at first render", async () => {
    render(<PaginationButtons page={1} />);
    const prevButtonElement = screen.getByRole("button", { name: /Prev/i });
    expect(prevButtonElement).toBeDisabled();
  });

  test("shoud next button be disabled the current page and total page is same", async () => {
    render(<PaginationButtons page={10} totalPages={10} />);
    const nextButtonElement = screen.getByRole("button", { name: /Next/i });
    expect(nextButtonElement).toBeDisabled();
  });

  test("should be disabled when totalpages === page", async () => {
    const page = 10;
    const totalPages = 10;
    render(<PaginationButtons page={page} totalPages={totalPages} />);
    const nextButtonElement = screen.getByRole("button", { name: /Next/i });
    expect(nextButtonElement).toBeDisabled();
  });
  test("should be disabled when page is 1", async () => {
    const page = 1;
    render(<PaginationButtons page={page} />);
    const prevButtonElement = screen.getByRole("button", { name: /Prev/i });
    expect(prevButtonElement).toBeDisabled();
  });
});
