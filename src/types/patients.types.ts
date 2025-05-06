import { Note, Patient } from "./api.types";

export type AddNoteProps = {
  patientId: string;
};

export type AddNoteFormValue = {
  content: string;
};

export type AddPatientFormValues = {
  name: string;
  age: number;
  condition: string;
};

export type EditNoteSheetProps = {
  patientId: string;
  note: Note;
  onClose: () => void;
};

export type EditNoteFormValues = {
  content: string;
};

export type EditPatientSheetProps = {
  patient: Patient;
  onClose: () => void;
};

export type EditPatientSheetFormValues = {
  name: string;
  age: number;
  condition: string;
};

export type NotesProps = {
  notes: Note[];
  patientId: string;
};

export type PatientCardProps = {
  name: string;
  age: number;
  condition: string;
};

export type PatientsPaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export type PatientsTableProps = {
  patients: Patient[];
};
