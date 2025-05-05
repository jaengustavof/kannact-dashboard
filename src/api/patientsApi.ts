import { Patient, Note } from "@/types/api.types";
import { patients as initialPatients } from "@/data/patients";
import { notes as initialNotes } from "@/data/notes";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

let patients: Patient[] = [...initialPatients];
let notes: Record<string, Note[]> = { ...initialNotes };

// GET all patients
export const getPatients = async (): Promise<Patient[]> => {
  await delay(500);
  return patients;
};

// GET one patient by ID
export const getPatient = async (id: string): Promise<Patient | undefined> => {
  await delay(500);
  return patients.find((patient) => patient.id === id);
};

// CREATE new patient
export const createPatient = async (
  data: Omit<Patient, "id">
): Promise<Patient> => {
  await delay(500);
  const newPatient: Patient = {
    ...data,
    id: Date.now().toString(),
  };
  patients.push(newPatient);
  return newPatient;
};

// UPDATE patient
export const updatePatient = async (
  id: string,
  updatedFields: Partial<Patient>
): Promise<Patient | undefined> => {
  await delay(500);
  patients = patients.map((patient) =>
    patient.id === id ? { ...patient, ...updatedFields } : patient
  );
  return;
};

// DELETE patient
export const deletePatient = async (id: string): Promise<void> => {
  await delay(500);
  patients = patients.filter((patient) => patient.id !== id);
  delete notes[id]; // limpiar notas también si existen
};

// GET all notes for a patient
export const getNotes = async (patientId: string): Promise<Note[]> => {
  await delay(500);
  return notes[patientId] || [];
};

// ADD a new note
export const addNote = async (
  patientId: string,
  content: string
): Promise<Note> => {
  await delay(500);
  const newNote: Note = {
    id: Date.now().toString(),
    content,
    createdAt: new Date().toISOString(),
  };
  notes[patientId] = [...(notes[patientId] || []), newNote];
  return newNote;
};

// EDIT a note
export const editNote = async (
  patientId: string,
  noteId: string,
  content: string
): Promise<Note | undefined> => {
  await delay(500);
  const updated = (notes[patientId] || []).map((note) =>
    note.id === noteId ? { ...note, content } : note
  );
  notes[patientId] = updated;
  return updated.find((note) => note.id === noteId);
};

// DELETE a note
export const deleteNote = async (
  patientId: string,
  noteId: string
): Promise<void> => {
  await delay(500);
  notes[patientId] = (notes[patientId] || []).filter(
    (note) => note.id !== noteId
  );
};
