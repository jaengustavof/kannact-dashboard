import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPatient, getNotes } from "@/api/patientsApi";
import PatientCard from "@/components/PatientCard";
import Notes from "@/components/Notes";
import AddNote from "@/components/AddNote";

export default function PatientDetail() {
  const { id } = useParams<{ id: string }>();

  const {
    data: patient,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["patient", id],
    queryFn: () =>
      id ? getPatient(id) : Promise.reject("Patient ID is undefined"),
  });

  const {
    data: notes,
    isLoading: isLoadingNotes,
    error: notesError,
  } = useQuery({
    queryKey: ["notes", id],
    queryFn: () =>
      id ? getNotes(id) : Promise.reject("Patient ID is undefined"),
    enabled: !!patient,
  });

  return (
    <div className="patients-details">
      <h1 className="patients-details__heading">Patients Details</h1>

      <div className="patients-details__back-button">
        <button onClick={() => window.history.back()}>
          Back to Patient list
        </button>
      </div>
      {isLoading && <div>Loading patient...</div>}
      {error && <div>Error patient not found...</div>}
      {patient && (
        <div className="patients-details__notes">
          <PatientCard
            name={patient.name}
            age={patient.age}
            condition={patient.condition}
          />
          <div className="patients-details__notes-container">
            <h3 className="patients-details__notes-heading">Notes</h3>
            {isLoadingNotes && <div>Loading notes...</div>}
            {notesError && <div>Error loading notes...</div>}
            {notes && notes.length > 0 ? (
              id && <Notes notes={notes} patientId={id} />
            ) : (
              <div>No notes available.</div>
            )}
            {id && <AddNote patientId={id} />}
          </div>
        </div>
      )}
    </div>
  );
}
