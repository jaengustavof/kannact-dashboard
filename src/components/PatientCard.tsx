import ADDPATIENT from "../constants/AddPatient";
import { PatientCardProps } from "@/types/patients.types";

export default function PatientCard({
  name,
  age,
  condition,
}: PatientCardProps) {
  return (
    <div className="patient-card">
      <div className="patient-card__image-container">
        <img
          src="/public/images/dummy-profile-pic.jpg"
          alt="Patient"
          className="patient-card__image"
        />
      </div>
      <div className="patient-card__info">
        <h2 className="patient-card__name">{name}</h2>
        <p className="patient-card__text">
          {ADDPATIENT.AGE}: {age}
        </p>
        <p className="patient-card__text">
          {ADDPATIENT.CONDITION}: {condition}
        </p>
      </div>
    </div>
  );
}
