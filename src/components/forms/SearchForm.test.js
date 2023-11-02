import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import SearchForm from "./SearchForm";

const mockedHandleSubmit = jest.fn();
const initialvalue = "Totoro";

describe("SearchForm ", () => {
  test("should render input element", async () => {
    render(<SearchForm />);
    const inputElement = screen.getByPlaceholderText(
      /Search for a movie, person.../i,
    );
    expect(inputElement).toBeInTheDocument();
  });

  test("should be able to type in input", async () => {
    render(<SearchForm />);
    const inputElement = screen.getByPlaceholderText(
      /Search for a movie, person.../i,
    );
    fireEvent.change(inputElement, { target: { value: "Totoro" } });
    expect(inputElement.value).toBe("Totoro");
  });

  test("should be show initial value in input field", async () => {
    render(<SearchForm initialValue={initialvalue} />);
    const inputElement = screen.getByPlaceholderText(
      /Search for a movie, person.../i,
    );
    expect(inputElement.value).toBe(initialvalue);
  });
});
