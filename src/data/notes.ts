import { Note } from "@/types/api.types";

export const notes: Record<string, Note[]> = {
  "1714845000000": [
    {
      id: "n1",
      content: "Patient improved diet.",
      createdAt: new Date().toISOString(),
    },
    {
      id: "n2",
      content: "Blood sugar levels stable.",
      createdAt: new Date().toISOString(),
    },
  ],
  "1714758600000": [
    {
      id: "n3",
      content: "Prescribed new inhaler.",
      createdAt: new Date().toISOString(),
    },
  ],
  "1714413000000": [
    {
      id: "n4",
      content: "Breathing exercises recommended.",
      createdAt: new Date().toISOString(),
    },
    {
      id: "n5",
      content: "Patient reported better sleep.",
      createdAt: new Date().toISOString(),
    },
  ],
  "1714240200000": [
    {
      id: "n6",
      content: "Scheduled nephrology follow-up.",
      createdAt: new Date().toISOString(),
    },
  ],
  "1714067400000": [
    {
      id: "n7",
      content: "Cholesterol medication adjusted.",
      createdAt: new Date().toISOString(),
    },
    {
      id: "n8",
      content: "Encouraged regular exercise.",
      createdAt: new Date().toISOString(),
    },
    {
      id: "n9",
      content: "Lab results pending.",
      createdAt: new Date().toISOString(),
    },
  ],
  "1714672200000": [],
  "1714585800000": [],
  "1714499400000": [],
  "1714326600000": [],
  "1714153800000": [],
  "1713981000000": [],
};
