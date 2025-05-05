import { render, screen, fireEvent } from "@testing-library/react";
import { PatientsTable } from "@/components/PatientsTable";
import { Patient } from "@/types/api.types";

// Mocks
const mockMutate = jest.fn();

jest.mock("@tanstack/react-query", () => ({
  useMutation: () => ({
    mutate: mockMutate,
    isPending: false,
  }),
  useQueryClient: () => ({
    invalidateQueries: jest.fn(),
  }),
}));

jest.mock("react-router-dom", () => ({
  Link: ({ to, children }: { to: string; children: React.ReactNode }) => (
    <a href={to}>{children}</a>
  ),
}));

jest.mock("@/components/ui/dropdown-menu", () => ({
  DropdownMenu: ({ children }: any) => <div>{children}</div>,
  DropdownMenuTrigger: ({ children }: any) => <button>{children}</button>,
  DropdownMenuContent: ({ children }: any) => <div>{children}</div>,
  DropdownMenuItem: ({ children, onClick }: any) => (
    <div onClick={onClick} role="menuitem">
      {children}
    </div>
  ),
  DropdownMenuSeparator: () => <hr />,
}));

jest.mock("@/components/EditPatientSheet", () => ({
  __esModule: true,
  default: () => (
    <tr data-testid="edit-patient-sheet-row">
      <td colSpan={5}>EditPatientSheet</td>
    </tr>
  ),
}));

jest.mock("@/api/patientsApi", () => ({
  deletePatient: jest.fn(),
}));

const mockPatients: Patient[] = [
  {
    id: "1",
    name: "John Doe",
    age: 45,
    condition: "Hypertension",
  },
];

describe("PatientsTable", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders patient data", () => {
    render(<PatientsTable patients={mockPatients} />);
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Hypertension")).toBeInTheDocument();
  });

  it("has profile link with correct href", () => {
    render(<PatientsTable patients={mockPatients} />);
    const profileLink = screen.getByText("Profile").closest("a");
    expect(profileLink).toHaveAttribute("href", "/patients/1");
  });

  it("calls mutate when clicking Delete", () => {
    render(<PatientsTable patients={mockPatients} />);
    fireEvent.click(screen.getByText("Delete"));
    expect(mockMutate).toHaveBeenCalledWith("1");
  });
});
