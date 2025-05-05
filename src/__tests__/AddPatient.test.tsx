import { render, screen, fireEvent } from "@testing-library/react";
import AddPatient from "@/components/AddPatient";

// Mocks controlados
const mockMutate = jest.fn();
const mockReset = jest.fn();

jest.mock("@tanstack/react-query", () => ({
  useMutation: () => ({
    mutate: mockMutate,
    isPending: false,
  }),
  useQueryClient: () => ({
    invalidateQueries: jest.fn(),
  }),
}));

jest.mock("react-hook-form", () => ({
  useForm: () => ({
    register: () => ({}),
    handleSubmit: (cb: any) => () =>
      cb({ name: "Test", age: 30, condition: "Diabetes" }),
    reset: mockReset,
  }),
}));

// Avoids the error 'Not implemented: requestSubmit'
beforeAll(() => {
  if (!HTMLFormElement.prototype.requestSubmit) {
    HTMLFormElement.prototype.requestSubmit = function () {
      return this.submit();
    };
  }
});

describe("AddPatient component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, "warn").mockImplementation(() => {});
  });

  it("renders the '+ Add Patient' button", () => {
    render(<AddPatient />);
    expect(screen.getByText("+ Add Patient")).toBeInTheDocument();
  });

  it("opens the sheet when clicking the button", () => {
    render(<AddPatient />);
    fireEvent.click(screen.getByText("+ Add Patient"));
    expect(
      screen.getByPlaceholderText("Enter patient name...")
    ).toBeInTheDocument();
  });

  it("submits the form and calls mutate", () => {
    render(<AddPatient />);
    fireEvent.click(screen.getByText("+ Add Patient"));

    const form = document.querySelector("form")!;
    fireEvent.submit(form);

    expect(mockMutate).toHaveBeenCalledWith({
      name: "Test",
      age: 30,
      condition: "Diabetes",
    });
  });
});
