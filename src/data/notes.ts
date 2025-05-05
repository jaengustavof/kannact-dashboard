import { Note } from "@/types/api.types";

export const notes: Record<string, Note[]> = {
  "1": [
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
  "3": [
    {
      id: "n3",
      content: "Prescribed new inhaler.",
      createdAt: new Date().toISOString(),
    },
  ],
  "5": [
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
  "7": [
    {
      id: "n6",
      content: "Scheduled nephrology follow-up.",
      createdAt: new Date().toISOString(),
    },
  ],
  "9": [
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
  "2": [],
  "4": [],
  "6": [],
  "8": [],
  "10": [],
  "11": [],
};
